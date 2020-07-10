import React, { useState, useEffect } from "react";
import Unsplash, { toJson } from "unsplash-js";

interface IImagePreference {
  query: string | null;
}

const unsplash = new Unsplash({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY || "",
});

export default function ImageList(props: IImagePreference) {
  const [imageResults, setImageResults] = useState([]);
  useEffect(function () {
    unsplash.search
      .photos("dogs", 1, 10, { orientation: "landscape" })
      .then(toJson)
      .then((json) => {
        setImageResults(json.results);
      });
  }, []);
  return (
    <div>
      {imageResults.map((result, index) => (
        <div key={index}>
          <img src={result["urls"]["small"]} alt={props.query || "pet"} />
        </div>
      ))}
    </div>
  );
}
