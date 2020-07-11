import React, { useState } from "react";
import { IDialogProps } from "../Commons/interfaces";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  GridList,
  GridListTile,
  GridListTileBar,
} from "@material-ui/core";
import { petQueries } from "../Commons/petQueries";
import ImageCredit from "./ImageCredit";

export default function SettingDialog(props: IDialogProps) {
  const [query, setQuery] = useState(petQueries[0]);
  return (
    <Dialog
      aria-labelledby="setting-dialog"
      onClose={props.onDialogClose}
      open={props.open || true}
    >
      <DialogTitle id="setting-dialog-title">
        Choose your Calendar Pet
      </DialogTitle>
      <DialogContent>
        <GridList cols={3}>
          {petQueries.map((pet, index) => (
            <GridListTile cols={1} key={index}>
              <img src={`pet-thumbnails/${pet.thumbnail}`} alt={pet.query} />
            </GridListTile>
          ))}
        </GridList>
      </DialogContent>
    </Dialog>
  );
}
