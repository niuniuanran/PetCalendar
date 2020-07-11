import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CalendarInfo from "./CalendarInfo";
import ImageList from "./ImageList";
import Unsplash, { toJson } from "unsplash-js";
import { bestReadableColour } from "../../Commons/colour-process";
import { sampleSize } from "lodash";
import { IImageInfo } from "../../Commons/interfaces";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    paddingTop: "3vh",
    gridTemplateRows: "70vh auto",
    gridGap: "3vh",
  },
  mainCalendar: {
    width: "100vw",
    overflow: "hidden",
    paddingLeft: "5vw",
    transition: "0.5s ease",
  },
  calendarInfo: {
    marginTop: "40px",
    transition: "0.5s ease",
  },
  mainImageContainer: {
    height: "100%",
  },
  mainImage: {
    height: "100%",
  },
}));
const unsplash = new Unsplash({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY || "",
});

export default function Calendar() {
  const [imageResults, setImageResults] = useState<IImageInfo[]>([]);
  const [currentFocus, setCurrentFocus] = useState(0);
  const [backgroundColour, setBackgroundColour] = useState("#fff");
  const [textColour, setTextColour] = useState("#000");

  useEffect(function () {
    unsplash.search
      .photos("dogs", 10, 15, { orientation: "landscape" })
      .then(toJson)
      .then((json) => {
        const results: IImageInfo[] = sampleSize(json.results, 15);
        setImageResults(() => results);
      });
  }, []);
  useEffect(
    function () {
      const imageColour =
        (imageResults[currentFocus] && imageResults[currentFocus]["color"]) ||
        "#fff";
      setBackgroundColour(imageColour);
      setTextColour(bestReadableColour(imageColour));
    },
    [currentFocus, imageResults]
  );

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        className={classes.mainCalendar}
        style={{
          backgroundColor: backgroundColour,
        }}
      >
        <Grid
          item
          xs={10}
          sm={5}
          md={4}
          className={classes.calendarInfo}
          style={{ color: textColour }}
        >
          <CalendarInfo />
        </Grid>
        <Grid item xs={10} sm={5} md={6} className={classes.mainImageContainer}>
          <img
            src={
              imageResults[currentFocus] &&
              imageResults[currentFocus]["urls"]["regular"]
            }
            className={classes.mainImage}
            alt=""
          />
        </Grid>
      </Grid>

      <ImageList
        imageList={imageResults}
        onClickImage={(index: number) => setCurrentFocus(() => index)}
        focusIndex={currentFocus}
      />
    </div>
  );
}
