import Packet from "./Packet"

class PacketC2SMute extends Packet {
    static ID = 0x0D;

    static MUTE_OFF = 0x00;
    static MUTE_ON = 0x01;
    static MUTE_TOGGLE = 0x02;

    constructor(state, fadeTime) {
        super();
        this._buffer.writeUint8(controllerId);
        this._buffer.writeUint16(zoneId);
    }

    getPacketID() {
        return PacketC2SMute.ID;
    }
}

export default PacketC2SMute
