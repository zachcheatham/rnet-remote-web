import Packet from "./Packet"

class PacketC2SSourceInfo extends Packet {
    static ID = 0x06;

    constructor(sourceId, name, type) {
        super();
        this._buffer.writeUint8(sourceId);
        this._buffer.writeCString(name);
        this._buffer.writeUint8(type);
    }

    getPacketID() {
        return PacketC2SSourceInfo.ID;
    }
}

export default PacketC2SSourceInfo
