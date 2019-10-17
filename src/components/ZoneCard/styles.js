export default (theme) => ({
    controls: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: theme.spacing(1),
    },
    volumeContainer: {
        borderTop: "1px solid #0C1823",
        height: 52,
        display: "flex",
        alignItems: "center",
        flexWrap: "nowrap",
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(3),
        paddingBottom: theme.spacing(1) + " !important"
    },
    volume: {
        flex: 1,
        marginLeft: theme.spacing(1)
    },
    muteIcon: {
        color: theme.palette.error.main,
    },
    card: {
        position: "relative"
    },
    cardContent: {
        zIndex: 2,
        position: "relative"
    },
    mediaBackground: {
        position: "absolute",
        opacity: 0.3,
        backgroundPosition: "center",
        backgroundSize: "cover",
        filter: "blur(8px)",
        top: -10,
        left: -10,
        right: -10,
        bottom: -10,
        overflow: "hidden"
    },
    sourceMenu: {
        zIndex: 5,
    },
    sourceMenuPaper: {
        backgroundColor: "#172c3d"
    },
    selectedSourceIcon: {
        color: theme.palette.secondary.main,
    },
    selectedSourceItem: {
        color: theme.palette.secondary.main,
    }
})
