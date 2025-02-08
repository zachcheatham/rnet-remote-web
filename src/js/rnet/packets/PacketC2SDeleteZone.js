import Packet from "./Packet"

class PacketC2SDeleteZone extends Packet {
    static ID = 0x05;

    constructor(controllerId, zoneId) {
        super();
        this._buffer.writeUint8(controllerId);
        this._buffer.writeUint8(zoneId);
    }

    getPacketID() {
        return PacketC2SDeleteZone.ID;
    }
}

export default PacketC2SDeleteZone
