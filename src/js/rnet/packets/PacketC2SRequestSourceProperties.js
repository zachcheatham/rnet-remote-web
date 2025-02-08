import Packet from "./Packet"

class PacketC2SRequestSourceProperties extends Packet {
    static ID = 0x33;

    constructor(sourceId) {
        super();
        this._buffer.writeUint8(sourceId);
    }

    getPacketID() {
        return PacketC2SRequestSourceProperties.ID;
    }
}

export default PacketC2SRequestSourceProperties
