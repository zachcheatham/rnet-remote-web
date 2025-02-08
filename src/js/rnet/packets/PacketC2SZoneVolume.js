import Packet from "./Packet"

class PacketC2SZoneVolume extends Packet {
    static ID = 0x09;

    constructor(controllerId, zoneId, volume) {
        super();
        this._buffer.writeUint8(controllerId);
        this._buffer.writeUint8(zoneId);
        this._buffer.writeUint8(volume);
    }

    getPacketID() {
        return PacketC2SZoneVolume.ID;
    }
}

export default PacketC2SZoneVolume;
