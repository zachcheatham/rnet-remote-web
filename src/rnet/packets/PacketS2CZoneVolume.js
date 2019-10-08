import Packet from "./Packet"

class PacketS2CZoneVolume extends Packet {
    static ID = 0x09;

    getPacketID() {
        return PacketS2CZoneVolume.ID;
    }

    _parseData() {
        this._controllerId = this._buffer.readUInt8();
        this._zoneId = this._buffer.readUInt8();
        this._volume = this._buffer.readUInt8();
    }

    getControllerId() {
        return this._controllerId;
    }

    getZoneId() {
        return this._zoneId;
    }

    getVolume() {
        return this._volume;
    }
}

export default PacketS2CZoneVolume;
