import Packet from "./Packet"

class PacketC2SZoneSource extends Packet {
    static ID = 0x0A;

    constructor(controllerId, zoneId, sourceId) {
        super();
        this._buffer.writeUint8(controllerId);
        this._buffer.writeUint8(zoneId);
        this._buffer.writeUint8(sourceId);
    }

    getPacketID() {
        return PacketC2SZoneSource.ID;
    }
}

export default PacketC2SZoneSource;
