import Packet from "./Packet"

class PacketC2SZoneMute extends Packet {
    static ID = 0x65;

    constructor(controllerId, zoneId, mute) {
        super();
        this._buffer.writeUint8(controllerId);
        this._buffer.writeUint8(zoneId);
        this._buffer.writeUint8(mute ? 1 : 0);
    }

    getPacketID() {
        return PacketC2SZoneMute.ID;
    }
}

export default PacketC2SZoneMute;
