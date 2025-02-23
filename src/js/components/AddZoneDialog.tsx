import React, { useState } from "react";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";

interface Props {
    open: boolean;
    onCloseCallback: () => void;
    addedCallback: (controllerId: number, zoneId: number, zoneName: string) => void;
}

interface State {
    zoneId: string;
    controllerId: string;
    zoneName: string;
}

const defaultState: State = {
    zoneId: "",
    controllerId: "",
    zoneName: ""
}

const AddZoneDialog: React.FC<Props> = ({open, onCloseCallback, addedCallback}) => {

    const [ state, setState ] = useState(defaultState);

    const onAddClick = () => {
        addedCallback(
            parseInt(state.controllerId),
            parseInt(state.zoneId),
            state.zoneName);
    };

    return (
        <Dialog open={open} onClose={onCloseCallback}>
            <DialogTitle>Add Zone</DialogTitle>
            <DialogContent>
                <Stack>
                    <Stack direction="row" spacing={1}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="controller-id"
                            label="Controller #"
                            variant="standard"
                            color="secondary"
                            value={state.controllerId}
                            onChange={(e) => setState({...state, controllerId: e.target.value})}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="zone-id"
                            label="Zone #"
                            variant="standard"
                            color="secondary"
                            value={state.zoneId}
                            onChange={(e) => setState({...state, zoneId: e.target.value})}
                        />
                    </Stack>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="zone-name"
                        label="Zone Name"
                        variant="standard"
                        color="secondary"
                        value={state.zoneName}
                        onChange={(e) => setState({...state, zoneName: e.target.value})}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={onCloseCallback}>Cancel</Button>
                <Button disabled color="secondary" onClick={onAddClick}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddZoneDialog;
