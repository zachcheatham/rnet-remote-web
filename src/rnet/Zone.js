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

    constructor(controllerId, zoneId, rNet) {
        this._controllerId = controllerId;
        this._zoneId = zoneId;
        this._rNet = rNet;

        this._parameters = [0,0,false,0,0,0,false,0,false];
        this._name = "Unknown";
        this._power = false;
        this._volume = 0;
        this._muted = false;
        this._maxVolume = 100;
        this._sourceId = -1;
    }

    getControllerId() {
        return controllerId;
    }

    getZoneId() {
        return zoneId;
    }

    setName(name, setRemotely) {
        if (this._name !== name)
        {
            this._name = name;

            for (let listener of this._rNet._listeners)
                if (listener.zoneChanged)
                    listener.zoneChanged(this, setRemotely, Zone.CHANGE_TYPE_NAME);

            /*if (!setRemotely)
                this._rNet.sendPacket(new PacketC2SZoneName(this._controllerId, this._zoneId, name));*/
        }
    }

    getName() {
        return this._name;
    }

    setPower(power, setRemotely) {
        if (power != this._power) {
            this._power = power;

            console.info(`[RNet] Zone #${this._controllerId}-${this._zoneId} power set to ${this._power}`);

            for (let listener of this._rNet._listeners)
                if (listener.zoneChanged)
                    listener.zoneChanged(this, setRemotely, Zone.CHANGE_TYPE_POWER);

            // TODO !setRemotely
        }
    }

    getPower() {
        return this._power;
    }

    setVolume(volume, setRemotely) {
        if (this._volume != volume) {
            this._volume = volume;

            console.info(`[RNet] Zone #${this._controllerId}-${this._zoneId} volume set to ${volume}`);

            for (let listener of this._rNet._listeners)
                if (listener.zoneChanged)
                    listener.zoneChanged(this, setRemotely, Zone.CHANGE_TYPE_VOLUME);
        }
    }

    getVolume() {
        return this._volume;
    }

    setMute(mute, setRemotely) {
        if (this._muted != mute) {
            this._muted = mute;

            console.info(`[RNet] Zone #${this._controllerId}-${this._zoneId} mute set to ${mute}`);

            for (let listener of this._rNet._listeners)
                if (listener.zoneChanged)
                    listener.zoneChanged(this, setRemotely, Zone.CHANGE_TYPE_MUTE);
        }
    }

    getMute() {
        return this._muted;
    }

    setMaxVolume(maxVolume, setRemotely) {
        if (maxVolume != this._maxVolume) {
            this._maxVolume = maxVolume;

            console.info(`[RNet] Zone #${this._controllerId}-${this._zoneId} max volume set to ${maxVolume}`);

            for (let listener of this._rNet._listeners)
                if (listener.zoneChanged)
                    listener.zoneChanged(this, setRemotely, Zone.CHANGE_TYPE_MAX_VOLUME);
        }
    }

    getMaxVolume() {
        return this._maxVolume;
    }

    setSourceId(sourceId, setRemotely) {
        if (this._sourceId != sourceId) {
            this._sourceId = sourceId;

            console.info(`[RNet] Zone #${this._controllerId}-${this._zoneId} source set to #${sourceId}`);

            for (let listener of this._rNet._listeners)
                if (listener.zoneChanged)
                    listener.zoneChanged(this, setRemotely, Zone.CHANGE_TYPE_SOURCE);
        }
    }

    getSourceId() {
        return this._sourceId;
    }

    setParameter(parameterId, value, setRemotely) {
        if (this._parameters[parameterId] !== value) {
            this._parameters[parameterId] = value;

            console.info(`[RNet] Zone #${this._controllerId}-${this._zoneId} parameter #${parameterId} set to ${value}`);

            for (let listener of this._rNet._listeners)
                if (listener.zoneChanged)
                    listener.zoneChanged(this, setRemotely, Zone.CHANGE_TYPE_PARAMETER);
        }
    }

    getParameter(parameterId) {
        return this._parameters[parameterId];
    }
}

export default Zone;
