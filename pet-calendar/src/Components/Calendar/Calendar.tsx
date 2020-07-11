import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CalendarInfo from "./CalendarInfo";
import ImageList from "./ImageList";
import Unsplash, { toJson } from "unsplash-js";

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
    marginTop: "20px",
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
  const [imageResults, setImageResults] = useState([]);
  const [currentFocus, setCurrentFocus] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [textColor, setTextColor] = useState("#000");

  useEffect(function () {
    unsplash.search
      .photos("dogs", 1, 10, { orientation: "landscape" })
      .then(toJson)
      .then((json) => {
        setImageResults(() => json.results);
      });
  }, []);
  useEffect(
    function () {
      const imageColour =
        (imageResults[currentFocus] && imageResults[currentFocus]["color"]) ||
        "#fffff";
      setBackgroundColor(() => imageColour);
    },
    [currentFocus]
  );

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        className={classes.mainCalendar}
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <Grid item xs={10} sm={5} md={4} className={classes.calendarInfo}>
          <CardContent>
            <CalendarInfo />
          </CardContent>
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
