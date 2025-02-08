import Packet from "./Packet";
import Source from "../Source";

class PacketS2CSourceDescriptiveText extends Packet {
    static ID = 0x35;

    getPacketID() {
        return PacketS2CSourceDescriptiveText.ID;
    }

    _parseData() {
        this._sourceId = this._buffer.readUInt8();
        this._displayTime = this._buffer.readUInt8();
        this._text = this._buffer.readCString();
    }

    getSourceId() {
        return this._sourceId;
    }

    getDisplayTime() {
        return this._displayTime;
    }

    getText() {
        return this._text;
    }
}

export default PacketS2CSourceDescriptiveText;
