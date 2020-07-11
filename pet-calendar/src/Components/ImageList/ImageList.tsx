import React, { useState, useEffect } from "react";
import Unsplash, { toJson } from "unsplash-js";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
// import GridListTileBar from "@material-ui/core/GridListTileBar";
// import IconButton from "@material-ui/core/IconButton";

interface IImagePreference {
  query: string | null;
}

const unsplash = new Unsplash({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY || "",
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    position: "fixed",
    bottom: "0",
  },
  thumbnailImage: {
    filter: "grayscale(90%) opacity(80%)",
    transition: "filter 0.5s ease",
    "&:hover": {
      filter: "grayscale(0%)",
    },
    '&[data-selected="true"]': {
      filter: "grayscale(0%)",
    },
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

export default function ImageList(props: IImagePreference) {
  const classes = useStyles();
  const [imageResults, setImageResults] = useState([]);
  useEffect(function () {
    unsplash.search
      .photos("dogs", 1, 10, { orientation: "landscape" })
      .then(toJson)
      .then((json) => {
        console.log(json.results);
        setImageResults(() => json.results);
      });
  }, []);
  return (
    <div>
      <GridList className={classes.gridList} cols={2.5}>
        {imageResults.map((result, index) => (
          <GridListTile key={index}>
            <img
              src={result["urls"]["regular"]}
              alt={props.query || "pet"}
              className={classes.thumbnailImage}
            />

            {/* <GridListTileBar title={result["description"]} /> */}
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
