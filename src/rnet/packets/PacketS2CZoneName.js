import Packet from "./Packet"

class PacketS2CZoneName extends Packet {
    static ID = 0x04;

    getPacketID() {
        return PacketS2CZoneName.ID;
    }

    _parseData() {
        this._controllerId = this._buffer.readUInt8();
        this._zoneId = this._buffer.readUInt8();
        this._zoneName = this._buffer.readCString();
    }

    getControllerId() {
        return this._controllerId;
    }

    getZoneId() {
        return this._zoneId;
    }

    getZoneName() {
        return this._zoneName;
    }
}

export default PacketS2CZoneName;
