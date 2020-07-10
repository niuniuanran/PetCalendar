import React, { useState, useEffect } from "react";
import Unsplash, { toJson } from "unsplash-js";

interface IImagePreference {
  query: string | null;
}

export default function ImageList(props: IImagePreference) {
  const [imageResults, setImageResults] = useState([]);
  useEffect(function () {}, []);
  return <div>props.query</div>;
}
