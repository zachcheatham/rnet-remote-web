import Packet from "./Packet";
import Source from "../Source";

class PacketS2CSourceDeleted extends Packet {
    static ID = 0x07;

    getPacketID() {
        return PacketS2CSourceDeleted.ID;
    }

    _parseData() {
        this._sourceId = this._buffer.readUInt8();
    }

    getSourceId() {
        return this._sourceId;
    }
}

export default PacketS2CSourceDeleted;
