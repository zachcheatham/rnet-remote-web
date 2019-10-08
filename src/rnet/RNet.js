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
import createPacket from "./packets/createPacket";

class RNet {
    static INTENT_ACTION = 1;
    static INTENT_SUBSCRIBE = 2;

    static PROPERTY_NAME = 1;
    static PROPERTY_VERSION = 2;
    static PROPERTY_SERIAL_CONNECTED = 3;
    static PROPERTY_WEB_SERVER_ENABLED = 4;

    static instance = null;

    static createInstance(host, port) {
        if (RNet.instance === null) {
            RNet.instance = new RNet(host, port);
            return RNet.instance;
        }
    }

    constructor(host, port) {
        this._host = host;
        this._port = port;

        this._shouldReconnect = false;
        this._receivedIndex = false;
        this._sources = {};
        this._zones = {};
        this._zoneIndex = [];
        this._name = "<unknown>";
        this._version = "<unknown>";
        this._newVersion = null;
        this._socket = null;

        this._connectivityListeners = [];
        this._listeners = [];
        this._zoneListeners = [];
        this._sourcesListeners = [];
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

            for (let listener of this._listeners)
                if (listener.disconnected)
                    listener.disconnected();

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
        })
    }

    disconnect() {
        this._shouldReconnect = true;
    }

    isConnected() {

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
        return newVersion != null;
    }

    getNewVersion() {
        return newVersion;
    }

    getHost() {
        return this._host;
    }

    getPort() {
        return this._port;
    }

    getZoneIndex() {
        return this._zoneIndex;
    }

    getZone(controllerId, zoneId) {
        if (controllerId in this._zones) {
            return this._zones[controllerId][zoneId];
        }

        return null;
    }

    getSource(sourceId) {
        if (sourceId in this._sources) {
            return this._sources[sourceId];
        }

        return null;
    }

    sendPacket(packet) {
        this._socket.send(packet.getBuffer());
    }

    addListener(listener) {
        this._listeners.push(listener);
    }

    removeListener(listener) {
        const index = this._listeners.indexOf(listener);
        if (index !== -1)
            this._listeners.splice(index, 1);
    }

    _handlePacket(packet) {
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

                    for (let listener of this._listeners)
                        if (listener.propertyChanged)
                            listener.propertyChanged(packet.getPropertyID(), packet.getValue());

                    break;
                }
                case PacketS2CSourceDeleted.ID:
                {
                    delete this._sources[packet.getSourceId()];

                    console.info("[RNet] Source #" + packet.getSourceId() + " deleted.");

                    for (let listener of this._listeners)
                        if (listener.sourceRemoved)
                            listener.sourceRemoved(packet.getSourceId());

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
                            for (let listener of this._listeners)
                                if (listener.descriptiveText)
                                    listener.descriptiveText(source, packet.getText(), packet.getDisplayTime());
                    }
                    else
                    {
                        console.warning("[RNet] Received descriptive text of unknown source #" + packet.getSourceId());
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
                        console.warning("[RNet] Received media metadata of unknown source #" + packet.getSourceId());
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
                        console.warning("[RNet] Received media play state of unknown source #" + packet.getSourceId());
                    }
                    break;
                }
                case PacketS2CSourceInfo.ID:
                {
                    let source = this.getSource(packet.getSourceId());
                    if (!source)
                    {
                        source = new Source(packet.getSourceId(), packet.getSourceName(), packet.getType(), this);
                        this._sources[packet.getSourceId()] = source;

                        console.info("[RNet] Created Source #" + packet.getSourceId());

                        for (let listener of this._listeners)
                            if (listener.sourceAdded)
                                listener.sourceAdded(source);
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
                        console.warning("[RNet] Received property of unknown source #" + packet.getPropertyId());
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
                        console.warning("[RNet] Received mute state of unknown zone #" + packet.getControllerId() + "-" + packet.getZoneId());
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

                        for (let listener of this._listeners)
                            if (listener.zoneAdded)
                                listener.zoneAdded();
                    }

                    zone.setName(packet.getZoneName(), true);
                    break;
                }
                case PacketS2CZoneDeleted.ID:
                {
                    this.deleteZone(packet.getControllerId(), packet.getZoneId(), true);
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
                        console.warning("[RNet] Received power state of unknown zone #" + packet.getControllerId() + "-" + packet.getZoneId());
                    }
                    break;
                }
                case PacketS2CZoneParameter.ID:
                {
                    const zone = this.getZone(packet.getControllerId(), packet.getZoneId());
                    if (zone)
                    {
                        zone.setParameter(packet.getParameterId(), packet.getParameterValue());
                    }
                    else
                    {
                        console.warning("[RNet] Received parameter of unknown zone #" + packet.getControllerId() + "-" + packet.getZoneId());
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
                        console.warning("[RNet] Received source ID of unknown zone #" + packet.getControllerId() + "-" + packet.getZoneId());
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
                        console.warning("[RNet] Received volume of unknown zone #" + packet.getControllerId() + "-" + packet.getZoneId());
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
                        console.warning("[RNet] Received max volume of unknown zone #" + packet.getControllerId() + "-" + packet.getZoneId());
                    }
                    break;
                }
                case PacketS2CUpdateAvailable.ID:
                {
                    this._newVersion = packet.getNewVersion();
                    for (let listener of this._listeners)
                        if (listener.updateAvailable)
                            listener.updateAvailable();

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

            for (let listener of this._listeners)
                if (listener.indexReceived)
                    listener.indexReceived();

            if (!this._receivedIndex)
                for (let listener of this._listeners)
                    if (listener.ready)
                        listener.ready();

            this._receivedIndex = true;
        }
    }
}

export default RNet;
