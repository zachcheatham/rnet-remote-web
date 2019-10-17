import {createMuiTheme} from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {main: "#11212E"},
        secondary: {main: "#f9a825"},
        background: {
            default: "#0a141d",
            paper: "#0f1d28"
        }
    }
});

export default theme;
