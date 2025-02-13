import { RNet } from "./RNet";


class Source {
    static TYPE_GENERIC = 0;
    static TYPE_AIRPLAY = 1;
    static TYPE_BLURAY = 2;
    static TYPE_CABLE = 3;
    static TYPE_CD = 4;
    static TYPE_COMPUTER = 5;
    static TYPE_DVD = 6;
    static TYPE_GOOGLE_CAST = 7;
    static TYPE_INTERNET_RADIO = 8;
    static TYPE_IPOD = 9;
    static TYPE_MEDIA_SERVER = 10;
    static TYPE_MP3 = 11;
    static TYPE_OTA = 12;
    static TYPE_PHONO = 13;
    static TYPE_RADIO = 14;
    static TYPE_SATELLITE_TV = 15;
    static TYPE_SATELLITE_RADIO = 16;
    static TYPE_SONOS = 17;
    static TYPE_CASSETTE = 18;
    static TYPE_VCR = 19;

    static PROPERTY_AUTO_ON_ZONES = 1;
    static PROPERTY_AUTO_OFF = 2;
    static PROPERTY_OVERRIDE_NAME = 3;

    static CONTROL_NEXT = 0;
    static CONTROL_PREV = 1;
    static CONTROL_STOP = 2;
    static CONTROL_PLAY = 3;
    static CONTROL_PAUSE = 4;
    static CONTROL_PLUS = 5;
    static CONTROL_MINUS = 6;

    _sourceId: number;
    _name: string;
    _type: number;
    _rnet: RNet;
    _descriptiveText: string;
    _title: string;
    _artist: string;
    _artworkUrl: string;
    _playing: boolean;
    _autoOff: boolean;
    _autoOnZones: number[];
    _overrideName: boolean;


    constructor(id: number, name: string, type: number, rnet: RNet) {
        this._sourceId = id;
        this._name = name;
        this._type = type;
        this._rnet = rnet;
        this._descriptiveText = null;
        this._title = null;
        this._artist = null;
        this._artworkUrl = null;
        this._playing = false;
        this._autoOff = false;
        this._autoOnZones = [];
        this._overrideName = false;
    }

    getId() {
        return this._sourceId;
    }

    setName(name: string, setRemotely: boolean = false) {
        if (name != this._name) {
            this._name = name;

            this._rnet.updateListeners({type: "SOURCE_STATE", source_id: this._sourceId, remote: setRemotely});
        }
    }

    getName() {
        return this._name;
    }

    setType(type: number, setRemotely: boolean = false) {
        if (this._type != type) {
            this._type = type;

            this._rnet.updateListeners({type: "SOURCE_STATE", source_id: this._sourceId, remote: setRemotely});
        }
    }

    getType() {
        return this._type;
    }

    control(operation) {
        // TODO
    }

    setPermanentDescriptiveText(text: string) {
        this._descriptiveText = text;
        this._rnet.updateListeners({type: "SOURCE_STATE", source_id: this._sourceId, remote: true});
    }

    getPermanentDescriptiveText() {
        return this._descriptiveText;
    }

    setMediaMetadata(title: string, artist: string, artworkUrl: string) {
        this._title = title;
        this._artist = artist;
        this._artworkUrl = artworkUrl;

        this._rnet.updateListeners({type: "SOURCE_STATE", source_id: this._sourceId, remote: true});
    }

    getMediaTitle() {
        return this._title;
    }

    getMediaArtist() {
        return this._artist;
    }

    getMediaArtworkUrl() {
        return this._artworkUrl;
    }

    setMediaPlayState(playing: boolean) {
        if (playing != this._playing) {
            this._playing = playing;

            this._rnet.updateListeners({type: "SOURCE_STATE", source_id: this._sourceId, remote: true});
        }
    }

    getMediaPlayState() {
        return this._playing;
    }

    requestProperties() {
        // TODO
    }

    setAutoOff(autoOff: boolean, setRemotely: boolean = false) {
        if (this._autoOff != autoOff) {
            this._autoOff = autoOff;
            this._rnet.updateListeners({type: "SOURCE_STATE", source_id: this._sourceId, remote: setRemotely});
        }
    }

    getAutoOff() {
        return this._autoOff;
    }

    setAutoOnZones(autoOnZones: number[], setRemotely: boolean = false) {
        this._autoOnZones = autoOnZones;
        this._rnet.updateListeners({type: "SOURCE_STATE", source_id: this._sourceId, remote: setRemotely});
    }

    getAutoOnZones() {
        return this._autoOnZones;
    }

    setOverrideName(overrideName: boolean, setRemotely: boolean = false) {
        if (this._overrideName != overrideName) {
            this._overrideName = overrideName;
            this._rnet.updateListeners({type: "SOURCE_STATE", source_id: this._sourceId, remote: setRemotely});
        }
    }

    getOverrideName() {
        return this._overrideName;
    }
}

export default Source;
