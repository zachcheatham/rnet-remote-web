import Packet from "./Packet";

class PacketS2CMediaPlayState extends Packet {
    static ID = 0x37;

    getPacketID() {
        return PacketS2CMediaPlayState.ID;
    }

    _parseData() {
        this._sourceId = this._buffer.readUInt8();
        this._playing = this._buffer.readUInt8() == 1;
    }

    getSourceId() {
        return this._sourceId;
    }

    getPlaying() {
        return this._playing;
    }
}

export default PacketS2CMediaPlayState;
