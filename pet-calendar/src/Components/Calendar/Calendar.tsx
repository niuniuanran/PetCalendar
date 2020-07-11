import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CalendarInfo from "./CalendarInfo";
import ImageList from "./ImageList";
import Unsplash, { toJson } from "unsplash-js";
import { IImageInfo } from "../../Commons/interfaces";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
  },
  mainCard: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));
const unsplash = new Unsplash({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY || "",
});

export default function Calendar() {
  const [imageResults, setImageResults] = useState([]);
  const [currentFocus, setCurrentFocus] = useState(0);

  useEffect(function () {
    unsplash.search
      .photos("dogs", 1, 10, { orientation: "landscape" })
      .then(toJson)
      .then((json) => {
        console.log(json.results);
        setImageResults(() => json.results);
      });
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card className={classes.mainCard}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <CalendarInfo />
          </CardContent>
          <div className={classes.controls}>
            {/* <IconButton aria-label="previous">
              {theme.direction === "rtl" ? (
                <SkipNextIcon />
              ) : (
                <SkipPreviousIcon />
              )}
            </IconButton>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
            <IconButton aria-label="next">
              {theme.direction === "rtl" ? (
                <SkipPreviousIcon />
              ) : (
                <SkipNextIcon />
              )}
            </IconButton> */}
          </div>
        </div>
        <CardMedia
          className={classes.cover}
          image={
            imageResults[currentFocus] &&
            imageResults[currentFocus]["urls"]["regular"]
          }
          title="Live from space album cover"
        />
      </Card>

      <ImageList
        imageList={imageResults}
        onClickImage={(index: number) => setCurrentFocus(() => index)}
        focusIndex={currentFocus}
      />
    </div>
  );
}
