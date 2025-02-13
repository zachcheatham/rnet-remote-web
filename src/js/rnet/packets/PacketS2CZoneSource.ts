import Packet from "./Packet"

class PacketS2CZoneSource extends Packet {
    static ID = 0x0A;

    _controllerId: number;
    _zoneId: number;
    _sourceId: number;

    getPacketID() {
        return PacketS2CZoneSource.ID;
    }

    _parseData() {
        this._controllerId = this._buffer.readUInt8();
        this._zoneId = this._buffer.readUInt8();
        this._sourceId = this._buffer.readUInt8();
    }

    getControllerId() {
        return this._controllerId;
    }

    getZoneId() {
        return this._zoneId;
    }

    getSourceId() {
        return this._sourceId;
    }
}

export default PacketS2CZoneSource;
