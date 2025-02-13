import { Container } from "@mui/material";
import { styled } from "@mui/system";

export default styled(Container)(({theme}) => ({
    paddingTop: theme.spacing(2),
    flex: 1,
    overflow: 'auto',
}));