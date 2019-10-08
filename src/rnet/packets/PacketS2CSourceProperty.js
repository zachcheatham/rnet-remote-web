import Packet from "./Packet";
import Source from "../Source";

class PacketS2CSourceProperty extends Packet {
    static ID = 0x34;

    getPacketID() {
        return PacketS2CSourceProperty.ID;
    }

    _parseData() {
        this._sourceId = this._buffer.readUInt8();
        this._propertyId = this._buffer.readUInt8();
        switch (this._propertyId) {
            case Source.PROPERTY_AUTO_OFF:
            case Source.PROPERTY_OVERRIDE_NAME:
                this._value = this_buffer.readUInt8() == 1;
                break;
            case Source.PROPERTY_AUTO_ON_ZONES:
                this._value = [];
                while (this._buffer.remaining() > 0) {
                    const zone = [];
                    zone[0] = this._buffer.readUInt8();
                    zone[1] = this._buffer.readUInt8();
                    this._value.push(zone);
                }
            default:
                this._value = null;
        }
    }

    getSourceId() {
        return this._sourceId;
    }

    getPropertyId() {
        return this._propertyId;
    }

    getPropertyValue() {
        return this._value;
    }
}

export default PacketS2CSourceProperty;
