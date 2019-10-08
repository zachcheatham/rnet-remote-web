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

    static CHANGE_TYPE_NAME = 0;
    static CHANGE_TYPE_TYPE = 1;
    static CHANGE_TYPE_METADATA = 2;
    static CHANGE_TYPE_PLAYSTATE = 3;
    static CHANGE_TYPE_AUTO_ON = 4;
    static CHANGE_TYPE_AUTO_OFF = 5;
    static CHANGE_TYPE_OVERRIDE_NAME = 6;

    constructor(id, name, type, rNet) {
        this._sourceId = id;
        this._name = name;
        this._type = type;
        this._rNet = rNet;
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

    setName(name, setRemotely) {
        if (!name == this._name) {
            this._name = name;

            for (let listener of this._rNet._listeners)
                if (listener.sourceChanged)
                    listener.sourceChanged(this, setRemotely, Source.CHANGE_TYPE_NAME);
        }
    }

    getName() {
        return this._name;
    }

    setType(type, setRemotely) {
        if (this._type != type) {
            this._type = type;

            for (let listener of this._rNet._listeners)
                if (listener.sourceChanged)
                    listener.sourceChanged(this, setRemotely, Source.CHANGE_TYPE_TYPE);
        }
    }

    getType() {
        return this._type;
    }

    control(operation) {
        // TODO
    }

    setPermanentDescriptiveText(text) {
        this._descriptiveText = text;

        for (let listener of this._rNet._listeners)
            if (listener.sourceDescriptiveText)
                listener.sourceDescriptiveText(this, text, 0);
    }

    getPermanentDescriptiveText() {
        return this._descriptiveText;
    }

    setMediaMetadata(title, artist, artworkUrl) {
        this._title = title;
        this._artist = artist;
        this._artworkUrl = artworkUrl;

        for (let listener of this._rNet._listeners)
            if (listener.sourceChanged)
                listener.sourceChanged(this, true, Source.CHANGE_TYPE_METADATA);
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

    setMediaPlayState(playing) {
        if (playing != this._playing) {
            this._playing = playing;

            for (let listener of this._rNet._listeners)
                if (listener.sourceChanged)
                    listener.sourceChanged(this, true, Source.CHANGE_TYPE_PLAYSTATE);
        }
    }

    getMediaPlayState() {
        return this._playing;
    }

    requestProperties() {
        // TODO
    }

    setAutoOff(autoOff, setRemotely) {
        if (this._autoOff != autoOff) {
            this._autoOff = autoOff;

            for (let listener of this._rNet._listeners)
                if (listener.sourceChanged)
                    listener.sourceChanged(this, setRemotely, Source.CHANGE_TYPE_AUTO_OFF);
        }
    }

    getAutoOff() {
        return this._autoOff;
    }

    setAutoOnZones(autoOnZones, setRemotely) {
        this._autoOnZones = autoOnZones;

        for (let listener of this._rNet._listeners)
            if (listener.sourceChanged)
                listener.sourceChanged(this, setRemotely, Source.CHANGE_TYPE_AUTO_ON);
    }

    getAutoOnZones() {
        return this._autoOnZones;
    }

    setOverrideName(overrideName, setRemotely) {
        if (this._overrideName != overrideName) {
            this._overrideName = overrideName;

            for (let listener of this._rNet._listeners)
                if (listener.sourceChanged)
                    listener.sourceChanged(this, setRemotely, Source.CHANGE_TYPE_OVERRIDE_NAME);
        }
    }

    getOverrideName() {
        return this._overrideName;
    }
}

export default Source;
