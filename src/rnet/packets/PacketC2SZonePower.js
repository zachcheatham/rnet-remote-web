import Packet from "./Packet"

class PacketC2SZonePower extends Packet {
    static ID = 0x08;

    constructor(controllerId, zoneId, power) {
        super();
        this._buffer.writeUint8(controllerId);
        this._buffer.writeUint8(zoneId);
        this._buffer.writeUint8(power ? 1 : 0);
    }

    getPacketID() {
        return PacketC2SZonePower.ID;
    }
}

export default PacketC2SZonePower;
