import Packet from "./Packet"

class PacketC2SSourceControl extends Packet {
    static ID = 0x32;

    constructor(sourceId, operation) {
        super();
        this._buffer.writeUint8(sourceId);
        this._buffer.writeUint8(operation);
    }

    getPacketID() {
        return PacketC2SSourceControl.ID;
    }
}

export default PacketC2SSourceControl
