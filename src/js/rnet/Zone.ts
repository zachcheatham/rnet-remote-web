import PacketC2SZonePower from "./packets/PacketC2SZonePower";
import PacketC2SZoneSource from "./packets/PacketC2SZoneSource";
import PacketC2SZoneVolume from "./packets/PacketC2SZoneVolume";
import PacketC2SZoneName from "./packets/PacketC2SZoneName";
import PacketC2SZoneMute from "./packets/PacketC2SZoneMute";

import { RNetListener, RNet } from "./RNet";

class Zone {
    static CHANGE_TYPE_NAME = 0;
    static CHANGE_TYPE_POWER = 1;
    static CHANGE_TYPE_VOLUME = 2;
    static CHANGE_TYPE_MUTE = 3;
    static CHANGE_TYPE_MAX_VOLUME = 4;
    static CHANGE_TYPE_SOURCE = 5;
    static CHANGE_TYPE_PARAMETER = 6;

    static PARAMETER_BASS = 0;
    static PARAMETER_TREBLE = 1;
    static PARAMETER_LOUDNESS = 2;
    static PARAMETER_BALANCE = 3;
    static PARAMETER_TURN_ON_VOLUME = 4;
    static PARAMETER_BACKGROUND_COLOR = 5;
    static PARAMETER_DO_NOT_DISTURB = 6;
    static PARAMETER_PARTY_MODE = 7;
    static PARMAETER_PARTY_MODE_OFF = 0;
    static PARAMETER_PARTY_MODE_ON = 1;
    static PARAMETER_PARTY_MODE_MASTER = 2;
    static PARAMETER_FRONT_AV_ENABLE = 8;

    _controllerId: number;
    _zoneId: number;
    _parameters: any[];
    _name: string;
    _power: boolean;
    _volume: number;
    _muted: boolean;
    _maxVolume: number;
    _sourceId: number;
    _rnet: RNet;

    constructor(controllerId: number, zoneId: number, rnet: RNet) {
        this._controllerId = controllerId;
        this._zoneId = zoneId;

        this._parameters = [0,0,false,0,0,0,false,0,false];
        this._name = "Unknown";
        this._power = false;
        this._volume = 0;
        this._muted = false;
        this._maxVolume = 100;
        this._sourceId = -1;
        this._rnet = rnet;
    }

    getControllerId() {
        return this._controllerId;
    }

    getZoneId() {
        return this._zoneId;
    }

    setName(name: string, setRemotely: boolean = false) {
        if (this._name !== name) {
            this._name = name;
            this._rnet.updateListeners({type: "ZONE_STATE", controller_id: this._controllerId, zone_id: this._zoneId, remote: setRemotely});
            if (!setRemotely)
                this._rnet.sendPacket(new PacketC2SZoneName(this._controllerId, this._zoneId, name));
        }
    }

    getName() {
        return this._name;
    }

    setPower(power: boolean, setRemotely: boolean = false) {
        if (power != this._power) {
            this._power = power;

            console.info(`[RNet] Zone #${this._controllerId}-${this._zoneId} power set to ${this._power}`);

            this._rnet.updateListeners({type: "ZONE_STATE", controller_id: this._controllerId, zone_id: this._zoneId, remote: setRemotely});

            if (!setRemotely)
                this._rnet.sendPacket(new PacketC2SZonePower(this._controllerId, this._zoneId, power));
        }
    }

    togglePower() {
        this.setPower(!this._power, false);
    }

    getPower() {
        return this._power;
    }

    setVolume(volume: number, setRemotely: boolean = false) {
        if (this._volume != volume) {
            this._volume = volume;

            console.info(`[RNet] Zone #${this._controllerId}-${this._zoneId} volume set to ${volume}`);

            this._rnet.updateListeners({type: "ZONE_STATE", controller_id: this._controllerId, zone_id: this._zoneId, remote: setRemotely});
            if (!setRemotely) {
                this._rnet.sendPacket(new PacketC2SZoneVolume(this._controllerId, this._zoneId, volume));
            }
        }
    }

    getVolume() {
        return this._volume;
    }

    setMute(mute: boolean, setRemotely: boolean = false) {
        if (this._muted != mute) {
            this._muted = mute;

            console.info(`[RNet] Zone #${this._controllerId}-${this._zoneId} mute set to ${mute}`);
            this._rnet.updateListeners({type: "ZONE_STATE", controller_id: this._controllerId, zone_id: this._zoneId, remote: setRemotely});

            if (!setRemotely) {
                this._rnet.sendPacket(new PacketC2SZoneMute(this._controllerId, this._zoneId, mute));
            }
        }
    }

    toggleMute() {
        this.setMute(!this._muted, false);
    }

    getMute() {
        return this._muted;
    }

    setMaxVolume(maxVolume: number, setRemotely: boolean = false) {
        if (maxVolume != this._maxVolume) {
            this._maxVolume = maxVolume;

            console.info(`[RNet] Zone #${this._controllerId}-${this._zoneId} max volume set to ${maxVolume}`);
            this._rnet.updateListeners({type: "ZONE_STATE", controller_id: this._controllerId, zone_id: this._zoneId, remote: setRemotely});
        }
    }

    getMaxVolume() {
        return this._maxVolume;
    }

    setSourceId(sourceId: number, setRemotely: boolean = false) {
        if (this._sourceId != sourceId) {
            this._sourceId = sourceId;

            console.info(`[RNet] Zone #${this._controllerId}-${this._zoneId} source set to #${sourceId}`);

            this._rnet.updateListeners({type: "ZONE_STATE", controller_id: this._controllerId, zone_id: this._zoneId, remote: setRemotely});

            if (!setRemotely) {
                this._rnet.sendPacket(new PacketC2SZoneSource(this._controllerId, this._zoneId, sourceId));
            }
        }
    }

    getSourceId() {
        return this._sourceId;
    }

    setParameter(parameterId: number, value: any, setRemotely: boolean = false) {
        if (this._parameters[parameterId] !== value) {
            this._parameters[parameterId] = value;

            console.info(`[RNet] Zone #${this._controllerId}-${this._zoneId} parameter #${parameterId} set to ${value}`);
            this._rnet.updateListeners({type: "ZONE_STATE", controller_id: this._controllerId, zone_id: this._zoneId, remote: setRemotely});
        }
    }

    getParameter(parameterId: number) {
        return this._parameters[parameterId];
    }
}

export default Zone;
