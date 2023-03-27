import React from "react";
import MovieCard from "@/components/MovieCard";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("MovieCard", () => {
  let expectedProps;
  beforeEach(() => {
    expectedProps = {
      adult: false,
      id: 4567,
      original_language: "English",
      original_title: "Here comes the sun",
      title: "Here comes the sun",
      overview: "Best movie ever...",
      poster_path:
        "https://www.google.com/search?q=dog&rlz=1C5GCEM_enCO992CO992&sxsrf=AJOqlzXKTjEd0x_ysfVAmY1AOGTAlIJ6nQ:1679088030259&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiDgNys8uP9AhUkSzABHXxDBmIQ0pQJegQIBxAC&biw=1438&bih=726&dpr=2#imgrc=i8__JR5jsTLauM",
    };
    render(<MovieCard {...expectedProps} />);
  });

  test("It should render movie card", () => {
    const image = screen.getByRole("img");
    expect(image).toBeVisible();
  });
});
