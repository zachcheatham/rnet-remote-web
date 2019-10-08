const ByteBuffer = require("bytebuffer");

class Packet {
    constructor(recvBuffer=false) {
        if (recvBuffer) {
            this._buffer = recvBuffer;
            this._parseData();
        }
        else {
            this._buffer = new ByteBuffer(255, true);
            this._buffer.writeUint8(this.getPacketID());
            this._buffer.writeUint8(0); // Placeholder for size
        }
    }

    getPacketID() {

    }

    _parseData() {

    }

    getBuffer() {
        this._buffer.writeUint8(this._buffer.offset - 2, 1);
        this._buffer.flip();
        return this._buffer.toBuffer();
    }

    getDebugString() {
        return this._buffer.toDebug();
    }
}

export default Packet;
