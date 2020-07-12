import React from "react";
import { IDialogProps } from "../Commons/interfaces";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
  thumbnail: {
    cursor: "pointer",
    transition: "0.2s ease",
    "&:hover": {
      transform: "scale(1.02,1.02)",
    },
  },
}));

export default function SettingDialog(props: IDialogProps) {
  const classes = useStyles();
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
            <GridListTile
              cols={1}
              key={index}
              className={classes.thumbnail}
              onClick={() => props.onDialogOK(pet.query)}
            >
              <img src={`pet-thumbnails/${pet.thumbnail}`} alt={pet.query} />
              <GridListTileBar
                title={pet.title}
                subtitle={
                  <ImageCredit
                    username={pet.credit.username}
                    name={pet.credit.name}
                  />
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </DialogContent>
    </Dialog>
  );
}
