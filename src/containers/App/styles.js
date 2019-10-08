export default theme => ({
    root: {
        display: "flex",
        height: "100vh",
        //width: "100vw",
        //overflow: "hidden",
        flexDirection: "row",
        flexWrap: "nowrap",

    },
    mainViewContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
    },
    splitViewContainer: {
        flex: 1,
        width: 400,
        maxWidth: 400,
        minWidth: 400,
        borderLeft: "1px solid #0a151e",
        position: "relative",
        overflow: "hidden",
    }
})
