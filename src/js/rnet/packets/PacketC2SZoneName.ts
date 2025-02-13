import Packet from "./Packet"

class PacketC2SZoneName extends Packet {
    static ID = 0x04;

    constructor(controllerId: number, zoneId: number, name: string) {
        super();
        this._buffer.writeUint8(controllerId);
        this._buffer.writeUint8(zoneId);
        this._buffer.writeCString(name);
    }

    getPacketID() {
        return PacketC2SZoneName.ID;
    }
}

export default PacketC2SZoneName;
