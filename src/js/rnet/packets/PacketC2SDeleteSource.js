import Packet from "./Packet"

class PacketC2SDeleteSource extends Packet {
    static ID = 0x07;

    constructor(sourceId) {
        super();
        this._buffer.writeUint8(sourceId);
    }

    getPacketID() {
        return PacketC2SDeleteSource.ID;
    }
}

export default PacketC2SDeleteSource
