import React from "react";
import ImageList from "./ImageList";
import { render, fireEvent, screen } from "@testing-library/react";

let currentFocus: number;
const testImageList = [
  {
    urls: {
      regular: "pet-thumbnails/dog.jpg",
    },
    color: "#000",
    user: {
      name: "tester1",
      username: "tester1",
    },
  },
  {
    urls: {
      regular: "pet-thumbnails/cat.jpg",
    },
    color: "#fff",
    user: {
      name: "tester2",
      username: "tester2",
    },
  },
];

test("ImageList should ", () => {
  render(
    <ImageList
      imageList={testImageList}
      onClickImage={(index) => {
        currentFocus = index;
      }}
      focusIndex={0}
    />
  );
  expect(screen.getByText("tester1")).toHaveAttribute(
    "href",
    `https://unsplash.com/@tester1?utm_source=PetCalendar&utm_medium=referral`
  );
  const images = screen.queryAllByAltText("pet");
  expect(images.length).toEqual(2);
  fireEvent.click(images[1]);
  expect(currentFocus).toEqual(1);
});
