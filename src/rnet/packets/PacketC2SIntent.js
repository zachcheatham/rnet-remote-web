import Packet from "./Packet"


class PacketC2SIntent extends Packet {
    static ID = 0x01;

    constructor() {
        super();
        this._buffer.writeUint8(2); // Web client only supports subscribe mode(0x02)
    }

    getPacketID() {
        return PacketC2SIntent.ID;
    }
}

export default PacketC2SIntent
