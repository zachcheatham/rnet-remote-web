import Packet from "./Packet"

class PacketC2SZoneMaxVolume extends Packet {
    static ID = 0x64;

    constructor(controllerId, zoneId, maxVolume) {
        super();
        this._buffer.writeUint8(controllerId);
        this._buffer.writeUint8(zoneId);
        this._buffer.writeUint8(maxVolume);
    }

    getPacketID() {
        return PacketC2SZoneMaxVolume.ID;
    }
}

export default PacketC2SZoneMaxVolume
