import React, { useState } from "react";
import { IDialogProps } from "../../Commons/interfaces";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
} from "@material-ui/core";
import { petQueries } from "../../Commons/petQueries";

export default function SettingDialog(props: IDialogProps) {
  const [query, setQuery] = useState(petQueries.dog);
  return (
    <Dialog
      aria-labelledby="setting-dialog"
      onClose={props.onDialogClose}
      open={props.open || true}
    >
      <DialogTitle id="setting-dialog-title">Pet Calendar Settings</DialogTitle>
      <DialogActions>
        <Button onClick={props.onDialogClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => props.onDialogOK(query)} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
