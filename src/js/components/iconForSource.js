import React from "react";

import Source from "../rnet/Source"

import AirplayIcon from '@material-ui/icons/Airplay';
import AlbumIcon from '@material-ui/icons/Album';
import AppleIcon from '@material-ui/icons/Apple';
import CastIcon from '@material-ui/icons/Cast';
import ComputerIcon from '@material-ui/icons/Computer';
import InputIcon from '@material-ui/icons/Input';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import RadioIcon from '@material-ui/icons/Radio';
import StorageIcon from '@material-ui/icons/Storage';
import TvIcon from '@material-ui/icons/Tv';
import VoicemailIcon from '@material-ui/icons/Voicemail';

function iconForSource(sourceType) {
    switch (sourceType) {
        case Source.TYPE_GENERIC:
        case Source.TYPE_SONOS:
            return InputIcon;
        case Source.TYPE_AIRPLAY:
            return AirplayIcon;
        case Source.TYPE_BLURAY:
        case Source.TYPE_CD:
        case Source.TYPE_DVD:
        case Source.TYPE_PHONO:
            return AlbumIcon;
        case Source.TYPE_CABLE:
        case Source.TYPE_OTA:
        case Source.TYPE_SATELLITE_TV:
            return TvIcon;
        case Source.TYPE_CASSETTE:
        case Source.TYPE_VCR:
            return VoicemailIcon;
        case Source.TYPE_COMPUTER:
            return ComputerIcon;
        case Source.TYPE_GOOGLE_CAST:
            return CastIcon;
        case Source.TYPE_INTERNET_RADIO:
        case Source.TYPE_RADIO:
        case Source.TYPE_SATELITE_RADIO:
            return RadioIcon;
        case Source.TYPE_IPOD:
            return AppleIcon;
        case Source.TYPE_MEDIA_SERVER:
            return StorageIcon;
        case Source.TYPE_MP3:
            return InsertDriveFileIcon;
    }
}

export default iconForSource;
