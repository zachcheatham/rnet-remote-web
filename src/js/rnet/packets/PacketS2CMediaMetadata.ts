import Packet from "./Packet";

class PacketS2CMediaMetadata extends Packet {
    static ID = 0x36;

    _sourceId: number;
    _title: string;
    _artist: string;
    _artworkUrl: string;

    getPacketID() {
        return PacketS2CMediaMetadata.ID;
    }

    _parseData() {
        this._sourceId = this._buffer.readUInt8();
        this._title = this._buffer.readCString();
        this._artist = this._buffer.readCString();
        this._artworkUrl = this._buffer.readCString();
    }

    getSourceId() {
        return this._sourceId;
    }

    getTitle() {
        return this._title;
    }

    getArtist() {
        return this._artist;
    }

    getArtworkUrl() {
        return this._artworkUrl;
    }
}

export default PacketS2CMediaMetadata;
