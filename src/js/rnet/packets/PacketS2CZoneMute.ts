import Packet from "./Packet"

class PacketS2CZoneMute extends Packet {
    static ID = 0x65;

    _controllerId: number;
    _zoneId: number;
    _mute: boolean;

    getPacketID() {
        return PacketS2CZoneMute.ID;
    }

    _parseData() {
        this._controllerId = this._buffer.readUInt8();
        this._zoneId = this._buffer.readUInt8();
        this._mute = this._buffer.readUInt8() == 1;
    }

    getControllerId() {
        return this._controllerId;
    }

    getZoneId() {
        return this._zoneId;
    }

    getMute() {
        return this._mute;
    }
}

export default PacketS2CZoneMute;
