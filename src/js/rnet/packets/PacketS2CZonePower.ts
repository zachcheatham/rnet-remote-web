import Packet from "./Packet"

class PacketS2CZonePower extends Packet {
    static ID = 0x08;

    _controllerId: number;
    _zoneId: number;
    _power: boolean;

    getPacketID() {
        return PacketS2CZonePower.ID;
    }

    _parseData() {
        this._controllerId = this._buffer.readUInt8();
        this._zoneId = this._buffer.readUInt8();
        this._power = this._buffer.readUInt8() == 1;
    }

    getControllerId() {
        return this._controllerId;
    }

    getZoneId() {
        return this._zoneId;
    }

    getPowered() {
        return this._power;
    }
}

export default PacketS2CZonePower;
