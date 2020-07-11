import React from "react";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500,
  },
});

export default function CalendarInfo() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h1" gutterBottom>
        {moment().format("LL")}
      </Typography>
      <Typography variant="h2" gutterBottom>
        {moment().format("dddd")}
      </Typography>
    </div>
  );
}
