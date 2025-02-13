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

const createPacket = (packetType: number, data: any) => {
    let newPacket;

    switch(packetType) {
        case 0x02:
            newPacket = new PacketS2CProperty(data); break;
        case 0x03:
            newPacket = new PacketS2CZoneIndex(data); break;
        case 0x04:
            newPacket = new PacketS2CZoneName(data); break;
        case 0x05:
            newPacket = new PacketS2CZoneDeleted(data); break;
        case 0x06:
            newPacket = new PacketS2CSourceInfo(data); break;
        case 0x07:
            newPacket = new PacketS2CSourceInfo(data); break;
        case 0x08:
            newPacket = new PacketS2CZonePower(data); break;
        case 0x09:
            newPacket = new PacketS2CZoneVolume(data); break;
        case 0x0A:
            newPacket = new PacketS2CZoneSource(data); break;
        case 0x0B:
            newPacket = new PacketS2CZoneParameter(data); break;
        case 0x34:
            newPacket = new PacketS2CSourceProperty(data); break;
        case 0x35:
            newPacket = new PacketS2CSourceDescriptiveText(data); break;
        case 0x36:
            newPacket = new PacketS2CMediaMetadata(data); break;
        case 0x37:
            newPacket = new PacketS2CMediaPlayState(data); break;
        case 0x64:
            newPacket = new PacketS2CZoneMaxVolume(data); break;
        case 0x65:
            newPacket = new PacketS2CZoneMute(data); break;
        case 0x7D:
            newPacket = new PacketS2CUpdateAvailable(data); break;
        default:
            console.warn("[RNet] Received unknown packet ID " + packetType);
            return undefined;
    }

    newPacket._parseData();
    return newPacket;
}

export default createPacket;
