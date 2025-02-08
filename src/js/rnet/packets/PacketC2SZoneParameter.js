import Packet from "./Packet"
import RNet from "../RNet"

class PacketC2SZoneParameter extends Packet {
    static ID = 0x0B;

    constructor(controllerId, zoneId, parameterId, value) {
        super();
        this._buffer.writeUint8(controllerId);
        this._buffer.writeUint8(zoneId);
        this._buffer.writeUint8(parameterId);

        switch (parameterId) {
            case Zone.PARAMETER_BALANCE:
            case Zone.PARAMETER_BASS:
            case Zone.PARAMETER_TREBLE:
                this._buffer.writeInt8(value);
                break;
            case Zone.PARAMETER_DO_NOT_DISTURB:
            case Zone.PARAMETER_FRONT_AV_ENABLE:
            case Zone.PARAMETER_LOUDNESS:
                this._buffer.writeUint8(value ? 1 : 0);
                break;
            default:
                this._buffer.writeUint8(value);
                break;
        }
    }

    getPacketID() {
        return PacketC2SZoneParameter.ID;
    }
}

export default PacketC2SZoneParameter;
