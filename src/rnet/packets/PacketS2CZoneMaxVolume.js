import Packet from "./Packet"

class PacketS2CZoneMaxVolume extends Packet {
    static ID = 0x64;

    getPacketID() {
        return PacketS2CZoneMaxVolume.ID;
    }

    _parseData() {
        this._controllerId = this._buffer.readUInt8();
        this._zoneId = this._buffer.readUInt8();
        this._maxVolume = this._buffer.readUInt8();
    }

    getControllerId() {
        return this._controllerId;
    }

    getZoneId() {
        return this._zoneId;
    }

    getMaxVolume() {
        return this._maxVolume;
    }
}

export default PacketS2CZoneMaxVolume;
