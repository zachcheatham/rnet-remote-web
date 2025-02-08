import Packet from "./Packet"
import RNet from "../RNet"

class PacketC2SProperty extends Packet {
    static ID = 0x02;

    constructor(property, value) {
        super();

        this._buffer.writeUint8(property);
        switch (property) {
            case RNet.PROPERTY_NAME:
                this._buffer.writeCString(value);
                break;
            case RNet.PROPERTY_WEB_SERVER_ENABLED:
                this._buffer.writeUint8(value ? 1 : 0);
                break;
        }
    }

    getPacketID() {
        return PacketC2SProperty.ID;
    }
}

export default PacketC2SProperty
