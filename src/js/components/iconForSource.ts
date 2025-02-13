import Source from "../rnet/Source";
import {
  Airplay,
  Album,
  Apple,
  Cast,
  Computer,
  Input,
  InsertDriveFile,
  Radio,
  Storage,
  Tv,
  Voicemail,
} from "@mui/icons-material";

export default (sourceType: number) => {
  switch (sourceType) {
    case Source.TYPE_GENERIC:
    case Source.TYPE_SONOS:
      return Input;
    case Source.TYPE_AIRPLAY:
      return Airplay;
    case Source.TYPE_BLURAY:
    case Source.TYPE_CD:
    case Source.TYPE_DVD:
    case Source.TYPE_PHONO:
      return Album;
    case Source.TYPE_CABLE:
    case Source.TYPE_OTA:
    case Source.TYPE_SATELLITE_TV:
      return Tv;
    case Source.TYPE_CASSETTE:
    case Source.TYPE_VCR:
      return Voicemail;
    case Source.TYPE_COMPUTER:
      return Computer;
    case Source.TYPE_GOOGLE_CAST:
      return Cast;
    case Source.TYPE_INTERNET_RADIO:
    case Source.TYPE_RADIO:
    case Source.TYPE_SATELLITE_RADIO:
      return Radio;
    case Source.TYPE_IPOD:
      return Apple;
    case Source.TYPE_MEDIA_SERVER:
      return Storage;
    case Source.TYPE_MP3:
      return InsertDriveFile;
  }
};
