export default theme => ({
    container: theme.mixins.gutters({
        paddingTop: theme.spacing(2),
        flex: 1,
        overflow: 'auto',
    })
})
