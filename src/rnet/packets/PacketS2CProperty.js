import Packet from "./Packet"
import RNet from "../RNet"

class PacketS2CProperty extends Packet {
    static ID = 0x02;

    getPacketID() {
        return PacketS2CProperty.ID;
    }

    _parseData() {
        this._property = this._buffer.readUInt8();
        switch (this._property) {
            case RNet.PROPERTY_SERIAL_CONNECTED:
            case RNet.PROPERTY_WEB_SERVER_ENABLED:
                this._value = this._buffer.readUInt8() == 1;
                break;
            case RNet.PROPERTY_NAME:
            case RNet.PROPERTY_VERSION:
                this._value = this._buffer.readCString();
                break;
        }
    }

    getPropertyID() {
        return this._property;
    }

    getValue() {
        return this._value;
    }
}

export default PacketS2CProperty;
