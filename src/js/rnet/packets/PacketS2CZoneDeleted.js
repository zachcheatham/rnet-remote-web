import Packet from "./Packet"

class PacketS2CZoneDeleted extends Packet {
    static ID = 0x05;

    getPacketID() {
        return PacketS2CZoneDeleted.ID;
    }

    _parseData() {
        this._controllerId = this._buffer.readUInt8();
        this._zoneId = this._buffer.readUInt8();
    }

    getControllerId() {
        return this._controllerId;
    }

    getZoneId() {
        return this._zoneId;
    }
}

export default PacketS2CZoneDeleted;
