import Packet from "./Packet"

class PacketC2SUpdate extends Packet {
    static ID = 0x7D;

    constructor() {
        super();
    }

    getPacketID() {
        return PacketC2SUpdate.ID;
    }
}

export default PacketC2SUpdate
