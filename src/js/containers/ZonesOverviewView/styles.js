export default theme => ({
    cardHolder: {
        display: "grid",
        gridGap: theme.spacing(1),
        gridTemplateColumns: "repeat( auto-fit, minmax(250px, 1fr) )"
    },
    loadingHolder: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        textAlign: "center",
    },
    loadingBox: {
        textAlign: "center",
    },
    loadingText: {
        marginTop: theme.spacing(2)
    }
})
