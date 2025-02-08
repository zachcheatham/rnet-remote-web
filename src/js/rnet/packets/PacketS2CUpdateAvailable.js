import Packet from "./Packet"

class PacketS2CUpdateAvailable extends Packet {
    static ID = 0x7D;

    getPacketID() {
        return PacketS2CUpdateAvailable.ID;
    }

    _parseData() {
        this._version = this._buffer.readCString();
    }

    getNewVersion() {
        return this._version;
    }
}

export default PacketS2CUpdateAvailable;
