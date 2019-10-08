import Packet from "./Packet"

class PacketS2CSourceInfo extends Packet {
    static ID = 0x06;

    getPacketID() {
        return PacketS2CSourceInfo.ID;
    }

    _parseData() {
        this._sourceID = this._buffer.readUInt8();
        this._sourceName = this._buffer.readCString();
        if (this._buffer.remaining() > 0) {
            this._type = this._buffer.readUInt8();
        }
        else {
            this._type = 0;
        }
    }

    getSourceId() {
        return this._sourceID;
    }

    getSourceName() {
        return this._sourceName;
    }

    getType() {
        return this._type;
    }
}

export default PacketS2CSourceInfo;
