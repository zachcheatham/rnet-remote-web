import PacketS2CProperty from "./PacketS2CProperty";
import PacketS2CZoneIndex from "./PacketS2CZoneIndex";
import PacketS2CZoneName from "./PacketS2CZoneName";
import PacketS2CZoneDeleted from "./PacketS2CZoneDeleted";
import PacketS2CSourceInfo from "./PacketS2CSourceInfo";
import PacketS2CZoneMute from "./PacketS2CZoneMute";
import PacketS2CZonePower from "./PacketS2CZonePower";
import PacketS2CZoneVolume from "./PacketS2CZoneVolume";
import PacketS2CZoneSource from "./PacketS2CZoneSource";
import PacketS2CZoneParameter from "./PacketS2CZoneParameter";
import PacketS2CSourceProperty from "./PacketS2CSourceProperty";
import PacketS2CSourceDescriptiveText from "./PacketS2CSourceDescriptiveText";
import PacketS2CMediaMetadata from "./PacketS2CMediaMetadata";
import PacketS2CMediaPlayState from "./PacketS2CMediaPlayState";
import PacketS2CZoneMaxVolume from "./PacketS2CZoneMaxVolume";
import PacketS2CUpdateAvailable from "./PacketS2CUpdateAvailable";

const createPacket = function(packetType, data) {
    switch(packetType) {
        case 0x02:
            return new PacketS2CProperty(data);
        case 0x03:
            return new PacketS2CZoneIndex(data);
        case 0x04:
            return new PacketS2CZoneName(data);
        case 0x05:
            return new PacketS2CZoneDeleted(data);
        case 0x06:
            return new PacketS2CSourceInfo(data);
        case 0x07:
            return new PacketS2CSourceInfo(data);
        case 0x08:
            return new PacketS2CZonePower(data);
        case 0x09:
            return new PacketS2CZoneVolume(data);
        case 0x0A:
            return new PacketS2CZoneSource(data);
        case 0x0B:
            return new PacketS2CZoneParameter(data);
        case 0x34:
            return new PacketS2CSourceProperty(data);
        case 0x35:
            return new PacketS2CSourceDescriptiveText(data);
        case 0x36:
            return new PacketS2CMediaMetadata(data);
        case 0x37:
            return new PacketS2CMediaPlayState(data);
        case 0x64:
            return new PacketS2CZoneMaxVolume(data);
        case 0x65:
            return new PacketS2CZoneMute(data);
        case 0x7D:
            return new PacketS2CUpdateAvailable(data);
        default:
            console.warn("[RNet] Received unknown packet ID " + packetType);
            return undefined;
    }
}

export default createPacket;
