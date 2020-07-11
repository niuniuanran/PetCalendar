import React, { useState, useEffect } from "react";
import Unsplash, { toJson } from "unsplash-js";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Typography from "@material-ui/core/Typography";

interface IImagePreference {
  query: string | null;
}
interface IImageInfo {
  urls: {
    regular: string;
  };
  color: string;
  user: {
    name: string;
    username: string;
  };
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
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)",
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
      <GridList className={classes.gridList} cols={4.1} cellHeight={160}>
        {imageResults.map((result: IImageInfo, index) => (
          <GridListTile key={index}>
            <img
              src={result["urls"]["regular"]}
              alt={props.query || "pet"}
              className={classes.thumbnailImage}
            />

            <GridListTileBar
              title={
                <ImageCredit
                  username={result.user.username}
                  name={result.user.name}
                />
              }
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

interface ICreditInfo {
  username: string;
  name: string;
}

function ImageCredit(props: ICreditInfo) {
  return (
    <Typography variant="caption" gutterBottom>
      Photo by{" "}
      <a
        href={`https://unsplash.com/@${props.username}?utm_source=${process.env.REACT_APP_NAME}&utm_medium=referral`}
        style={{ color: "#fff" }}
      >
        {props.name}
      </a>{" "}
      on{" "}
      <a
        href={`https://unsplash.com/?utm_source=${process.env.REACT_APP_NAME}&utm_medium=referral`}
        style={{ color: "#fff" }}
      >
        Unsplash
      </a>
    </Typography>
  );
}
