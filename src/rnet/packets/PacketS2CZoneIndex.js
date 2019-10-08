import Packet from "./Packet"

class PacketS2CZoneIndex extends Packet {
    static ID = 0x03;

    getPacketID() {
        return PacketS2CZoneIndex.ID;
    }

    _parseData() {
        this._zones = [];

        while (this._buffer.offset < this._buffer.limit) {
            const zone = [];
            zone[0] = this._buffer.readUInt8();
            zone[1] = this._buffer.readUInt8();
            this._zones.push(zone);
        }
    }

    getIndex() {
        return this._zones;
    }
}

export default PacketS2CZoneIndex;
