import React from "react";
import Typography from "@material-ui/core/Typography";

interface ICreditInfo {
  username: string;
  name: string;
}

export default function ImageCredit(props: ICreditInfo) {
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
