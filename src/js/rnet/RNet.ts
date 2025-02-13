import ByteBuffer from "bytebuffer";

import Zone from "./Zone";
import Source from "./Source";

import PacketC2SIntent from "./packets/PacketC2SIntent";
import PacketS2CProperty from "./packets/PacketS2CProperty";
import PacketS2CMediaMetadata from "./packets/PacketS2CMediaMetadata";
import PacketS2CMediaPlayState from "./packets/PacketS2CMediaPlayState";
import PacketS2CSourceDeleted from "./packets/PacketS2CSourceDeleted";
import PacketS2CSourceDescriptiveText from "./packets/PacketS2CSourceDescriptiveText";
import PacketS2CSourceInfo from "./packets/PacketS2CSourceInfo";
import PacketS2CSourceProperty from "./packets/PacketS2CSourceProperty";
import PacketS2CZoneDeleted from "./packets/PacketS2CZoneDeleted";
import PacketS2CZoneIndex from "./packets/PacketS2CZoneIndex";
import PacketS2CZoneMaxVolume from "./packets/PacketS2CZoneMaxVolume";
import PacketS2CZoneMute from "./packets/PacketS2CZoneMute";
import PacketS2CZoneName from "./packets/PacketS2CZoneName";
import PacketS2CZoneParameter from "./packets/PacketS2CZoneParameter";
import PacketS2CZonePower from "./packets/PacketS2CZonePower";
import PacketS2CZoneSource from "./packets/PacketS2CZoneSource";
import PacketS2CZoneVolume from "./packets/PacketS2CZoneVolume";
import PacketS2CUpdateAvailable from "./packets/PacketS2CUpdateAvailable";
import createPacket from "./packets/createPacket";

type Event = 
    | { type: "CONNECTED"; }
    | { type: "DISCONNECTED"; }
    | { type: "SERVER_PROPERTY"; property_id: number; property_value: any; }
    | { type: "INDEX_RECEIVED"; }
    | { type: "READY"; }
    | { type: "ZONE_ADDED", controller_id: number; zone_id: number; }
    | { type: "ZONE_REMOVED", controller_id: number; zone_id: number; }
    | { type: "ZONE_STATE", controller_id: number; zone_id: number; remote: boolean; }
    | { type: "SOURCE_ADDED"; source_id: number; }
    | { type: "SOURCE_REMOVED"; source_id: number; }
    | { type: "SOURCE_STATE"; source_id: number; remote: boolean; }
    | { type: "DESCRIPTIVE_TEXT"; source_id: number; text: string; display_time: number; }
    | { type: "UPDATE_AVAILABLE"; }

type RNetListener = (event: Event) => void;

class RNet {
    static INTENT_ACTION = 1;
    static INTENT_SUBSCRIBE = 2;

    static PROPERTY_NAME = 1;
    static PROPERTY_VERSION = 2;
    static PROPERTY_SERIAL_CONNECTED = 3;
    static PROPERTY_WEB_SERVER_ENABLED = 4;

    _host: string;
    _port: number;
    _hasConnected: boolean;
    _shouldReconnect: boolean;
    _receivedIndex: boolean;
    _sources: Map<number, Source>;
    _zones: Map<number, Map<number, Zone>>;
    _zoneIndex: number[][];
    _name: string;
    _version: string;
    _newVersion: boolean;
    _socket: any;
    _listeners: RNetListener[];

    constructor(host: string, port: number, listener: RNetListener) {
        this._host = host;
        this._port = port;

        this._shouldReconnect = false;
        this._receivedIndex = false;
        this._sources = new Map();
        this._zones = new Map();
        this._zoneIndex = [];
        this._name = "RNet: Processing";
        this._version = "<unknown>";
        this._newVersion = null;
        this._socket = null;
        this._listeners = [listener];
    }

    updateListeners(event: Event) {
        for (var listener of this._listeners) {
            listener(event);
        }
    }

    connect() {
        this._shouldReconnect = true;
        this._hasConnected = false;

        console.info(`[RNet] Connecting to ${this._host}:${this._port}`);
        this._socket = new WebSocket(`ws://${this._host}:${this._port}`);
        this._socket.binaryType = "arraybuffer";

        this._socket.addEventListener("open", (event) => {
            console.log("[RNet] Connected.");
            this.sendPacket(new PacketC2SIntent());
            this._hasConnected = true;
        });

        this._socket.addEventListener("message", (event) => {
            const buffer = ByteBuffer.wrap(event.data, true);
            const packetID = buffer.readUInt8();
            buffer.readUInt8(); // Ignore packet length
            const packet = createPacket(packetID, buffer);
            if (packet !== undefined)
                this._handlePacket(packet);
        })

        this._socket.addEventListener("close", (event) => {
            if (event.code == 1000)
                return;

            this._receivedIndex = false;

            let waitReconnect = false;
            if (!this._hasConnected) {
                console.error("[RNet] Unable to connect!");
                waitReconnect = true;
            }
            else {
                console.error("[RNet] Lost Connection!");
            }

            this.updateListeners({type: "DISCONNECTED"});

            if (this._shouldReconnect) {
                if (waitReconnect) {
                    console.log("[RNet] Will attempt to reconnect in 10 seconds...");
                    setTimeout(() => {
                        if (this._shouldReconnect) {
                            console.log("[RNet] Attempting to reconnect...");
                            this.connect();
                        }
                    }, 10000);
                }
                else {
                    console.log("[RNet] Attempting to reconnect...");
                    this.connect();
                }
            }
            else {
                this._hasConnected = false;
                this._receivedIndex = false;
                this._shouldReconnect = false;
                this._socket = null;
            }
        })
    }

    disconnect() {
        this._shouldReconnect = false;
        console.log("[RNet] Closing websocket connection...");
        this._socket.close();
    }

    destroy() {
        this._listeners = [];
    }

    subscribe(listener: RNetListener) {
        if (this._listeners.indexOf(listener) === -1)
            this._listeners.push(listener);
    }

    unsubscribe(listener: RNetListener) {
        const i = this._listeners.indexOf(listener);
        if (i !== -1) this._listeners.splice(i, 1);
    }

    isConnected() {
        return this._hasConnected;
    }

    isReady() {
        return this._receivedIndex;
    }

    getName() {
        return this._name;
    }

    getVersion() {
        return this._version;
    }

    updateAvailable() {
        return this._newVersion != null;
    }

    getNewVersion() {
        return this._newVersion;
    }

    getHost() {
        return this._host;
    }

    getPort() {
        return this._port;
    }

    getZoneIndex(): number[][] {
        return this._zoneIndex;
    }

    getZone(controllerId: number, zoneId: number): Zone {
        if (controllerId in this._zones) {
            return this._zones[controllerId][zoneId];
        }

        return null;
    }

    getSource(sourceId: number) {
        return this._sources.get(sourceId);
    }

    sendPacket(packet) {
        this._socket.send(packet.getBuffer());
    }

    _handlePacket(packet: any) {
        if (this._receivedIndex) {
            switch(packet.getPacketID()) {
                case PacketS2CProperty.ID:
                {
                    switch (packet.getPropertyID())
                    {
                        case RNet.PROPERTY_NAME:
                            this._name = packet.getValue();
                            break;
                        case RNet.PROPERTY_VERSION:
                            this._version = packet.getValue();
                            break;
                    }

                    this.updateListeners({type: "SERVER_PROPERTY", property_id: packet.getPropertyID(), property_value: packet.getValue()});
                    break;
                }
                case PacketS2CSourceDeleted.ID:
                {
                    delete this._sources[packet.getSourceId()];

                    console.info("[RNet] Source #" + packet.getSourceId() + " deleted.");
                    this.updateListeners({ type: "SOURCE_REMOVED", source_id: packet.getSourceId() });
                    break;
                }
                case PacketS2CSourceDescriptiveText.ID:
                {
                    const source = this.getSource(packet.getSourceId());
                    if (source)
                    {
                        if (packet.getDisplayTime() == 0)
                            source.setPermanentDescriptiveText(packet.getText());
                        else
                            this.updateListeners({ type: "DESCRIPTIVE_TEXT", source_id: packet.getSourceId(), text: packet.getText(), display_time: packet.getDisplayTime() });
                    }
                    else
                    {
                        console.warn("[RNet] Received descriptive text of unknown source #" + packet.getSourceId());
                    }

                    break;
                }
                case PacketS2CMediaMetadata.ID:
                {
                    const source = this.getSource(packet.getSourceId());
                    if (source)
                    {
                        source.setMediaMetadata(packet.getTitle(), packet.getArtist(), packet.getArtworkUrl());
                    }
                    else
                    {
                        console.warn("[RNet] Received media metadata of unknown source #" + packet.getSourceId());
                    }
                    break;
                }
                case PacketS2CMediaPlayState.ID:
                {
                    const source = this.getSource(packet.getSourceId());
                    if (source)
                    {
                        source.setMediaPlayState(packet.getPlaying());
                    }
                    else
                    {
                        console.warn("[RNet] Received media play state of unknown source #" + packet.getSourceId());
                    }
                    break;
                }
                case PacketS2CSourceInfo.ID:
                {
                    let source = this.getSource(packet.getSourceId());
                    if (!source)
                    {
                        source = new Source(packet.getSourceId(), packet.getSourceName(), packet.getType(), this);
                        this._sources.set(packet.getSourceId(), source);

                        console.info("[RNet] Created Source #" + packet.getSourceId());
                        this.updateListeners({ type: "SOURCE_ADDED", source_id: packet.getSourceId() });
                    }
                    else
                    {
                        source.setName(packet.getSourceName(), true);
                        source.setType(packet.getType(), true);
                    }

                    break;
                }
                case PacketS2CSourceProperty.ID:
                {
                    const source = this.getSource(packet.getSourceId());
                    if (source)
                    {
                        switch (packet.getPropertyId())
                        {
                            case Source.PROPERTY_AUTO_OFF:
                                source.setAutoOff(packet.getPropertyValue(), true);
                                break;
                            case Source.PROPERTY_AUTO_ON_ZONES:
                                source.setAutoOnZones(packet.getPropertyValue(), true);
                                break;
                            case Source.PROPERTY_OVERRIDE_NAME:
                                source.setOverrideName(packet.getPropertyValue(), true);
                                break;
                        }
                    }
                    else
                    {
                        console.warn("[RNet] Received property of unknown source #" + packet.getPropertyId());
                    }

                    break;
                }
                case PacketS2CZoneMute.ID:
                {
                    const zone = this.getZone(packet.getControllerId(), packet.getZoneId());
                    if (zone)
                    {
                        zone.setMute(packet.getMute(), true);
                    }
                    else
                    {
                        console.warn("[RNet] Received mute state of unknown zone #" + packet.getControllerId() + "-" + packet.getZoneId());
                    }
                    break;
                }
                case PacketS2CZoneName.ID:
                {
                    if (!(packet.getControllerId() in this._zones)) {
                        this._zones[packet.getControllerId()] = {};
                    }

                    let zone = this.getZone(packet.getControllerId(), packet.getZoneId());

                    if (!zone) {
                        zone = new Zone(packet.getControllerId(), packet.getZoneId(), this);
                        this._zones[packet.getControllerId()][packet.getZoneId()] = zone;
                        this.updateListeners({type: "ZONE_ADDED", controller_id: packet.getControllerId(), zone_id: packet.getZoneId()});
                    }

                    zone.setName(packet.getZoneName(), true);
                    break;
                }
                case PacketS2CZoneDeleted.ID:
                {
                    // this.deleteZone(packet.getControllerId(), packet.getZoneId(), true); // TODO
                    this.updateListeners({type: "ZONE_REMOVED", controller_id: packet.getControllerId(), zone_id: packet.getZoneId()});
                    break;
                }
                case PacketS2CZonePower.ID:
                {
                    const zone = this.getZone(packet.getControllerId(), packet.getZoneId());
                    if (zone)
                    {
                        zone.setPower(packet.getPowered(), true);
                    }
                    else
                    {
                        console.warn("[RNet] Received power state of unknown zone #" + packet.getControllerId() + "-" + packet.getZoneId());
                    }
                    break;
                }
                case PacketS2CZoneParameter.ID:
                {
                    const zone = this.getZone(packet.getControllerId(), packet.getZoneId());
                    if (zone)
                    {
                        zone.setParameter(packet.getParameterId(), packet.getParameterValue(), true);
                    }
                    else
                    {
                        console.warn("[RNet] Received parameter of unknown zone #" + packet.getControllerId() + "-" + packet.getZoneId());
                    }
                    break;
                }
                case PacketS2CZoneSource.ID:
                {
                    const zone = this.getZone(packet.getControllerId(), packet.getZoneId());
                    if (zone)
                    {
                        zone.setSourceId(packet.getSourceId(), true);
                    }
                    else
                    {
                        console.warn("[RNet] Received source ID of unknown zone #" + packet.getControllerId() + "-" + packet.getZoneId());
                    }
                    break;
                }
                case PacketS2CZoneVolume.ID:
                {
                    const zone = this.getZone(packet.getControllerId(), packet.getZoneId());
                    if (zone)
                    {
                        zone.setVolume(packet.getVolume(), true);
                    }
                    else
                    {
                        console.warn("[RNet] Received volume of unknown zone #" + packet.getControllerId() + "-" + packet.getZoneId());
                    }
                    break;
                }
                case PacketS2CZoneMaxVolume.ID:
                {
                    const zone = this.getZone(packet.getControllerId(), packet.getZoneId());
                    if (zone)
                    {
                        zone.setMaxVolume(packet.getMaxVolume(), true);
                    }
                    else
                    {
                        console.warn("[RNet] Received max volume of unknown zone #" + packet.getControllerId() + "-" + packet.getZoneId());
                    }
                    break;
                }
                case PacketS2CUpdateAvailable.ID:
                {
                    this._newVersion = packet.getNewVersion();
                    this.updateListeners({type: "UPDATE_AVAILABLE" });

                    break;
                }
            }
        }
        else if (packet.getPacketID() == PacketS2CZoneIndex.ID) {
            for (let zoneInfo of packet.getIndex()) {
                if (!(zoneInfo[0] in this._zones)) {
                    this._zones[zoneInfo[0]] = {};
                }

                if (!(zoneInfo[1] in this._zones[zoneInfo[0]])) {
                    const zone = new Zone(zoneInfo[0], zoneInfo[1], this);
                    this._zones[zoneInfo[0]][zoneInfo[1]] = zone;
                }
            }

            this._zoneIndex = packet.getIndex();
            this._receivedIndex = true;

            this.updateListeners({type: "INDEX_RECEIVED"});
            this.updateListeners({type: "READY"});            
        }
    }
}

export {RNet, RNetListener, Event};
