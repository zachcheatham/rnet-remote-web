import Packet from "./Packet"
import Zone from "../Zone"

class PacketS2CZoneParameter extends Packet {
    static ID = 0x0B;

    getPacketID() {
        return PacketS2CZoneParameter.ID;
    }

    _parseData() {
        this._controllerId = this._buffer.readUInt8();
        this._zoneId = this._buffer.readUInt8();
        this._parameterId = this._buffer.readUInt8();

        switch (this._parameterId) {
            case Zone.PARAMETER_BALANCE:
            case Zone.PARAMETER_BASS:
            case Zone.PARAMETER_TREBLE:
                this._parameterValue = this._buffer.readInt8();
                break;
            case Zone.PARAMETER_DO_NOT_DISTURB:
            case Zone.PARAMETER_FRONT_AV_ENABLE:
            case Zone.PARAMETER_LOUDNESS:
                this._parameterValue = this._buffer.readUInt8() == 1;
                break;
            default:
                this._parameterValue = this._buffer.readUInt8();
                break;
        }
    }

    getControllerId() {
        return this._controllerId;
    }

    getZoneId() {
        return this._zoneId;
    }

    getParameterId() {
        return this._parameterId;
    }

    getParameterValue() {
        return this._parameterValue;
    }
}

export default PacketS2CZoneParameter;
