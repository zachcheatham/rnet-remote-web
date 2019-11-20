import Packet from "./Packet"

class PacketC2SAllPower extends Packet {
    static ID = 0x0C;

    constructor(power) {
        super();
        this._buffer.writeUint8(power ? 1 : 0);
    }

    getPacketID() {
        return PacketC2SAllPower.ID;
    }
}

export default PacketC2SAllPower
