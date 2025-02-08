import Packet from "./Packet"
import Source from "../Source"

class PacketC2SSourceProperty extends Packet {
    static ID = 0x34;

    constructor(sourceId, propertyId, propertyValue) {
        super();
        this._buffer.writeUint8(sourceId);
        this._buffer.writeUint8(propertyId);

        switch (propertyId) {
            case Source.PROPERTY_AUTO_OFF:
            case Source.PROPERTY_OVERRIDE_NAME:
                this._buffer.writeUint8(value ? 1 : 0);
                break;
            case Source.PROPERTY_AUTO_ON_ZONES:
                for (let z of propertyValue) {
                    this._buffer.writeUint8(z[0]);
                    this._buffer.writeUint8(z[1]);
                }
                break;
        }
    }

    getPacketID() {
        return PacketC2SSourceProperty.ID;
    }
}

export default PacketC2SSourceProperty
