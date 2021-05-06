import React from "react";
import "./App.scss";

import { Square } from "./components/Square";
import { AddSquareForm } from "./components/forms/AddSquareForm";
import { FilterColorForm } from "./components/forms/FilterColorForm";

import { createRandomId, sortColors, reduceFilters } from "./helpers";
import { Color, ColorFilter } from "./types";

interface AppState {
  colors: Color[];
  filters: ((color: Color) => boolean)[];
}

const predefinedColors = [
  "#1ABC9C",
  "#2ECC71",
  "#3498DB",
  "#9B59B6",
  "#34495E",
  "#16A085",
  "#27AE60",
  "#2980B9",
  "#8E44AD",
  "#2C3E50",
  "#F1C40F",
  "#E67E22",
  "#E74C3C",
  "#ECF0F1",
  "#95A5A6",
  "#F39C12",
  "#D35400",
  "#C0392B",
  "#BDC3C7",
  "#7F8C8D",
];

export class App extends React.Component<{}, AppState> {
  public constructor(props: never) {
    super(props);
    const initialColors = (predefinedColors ?? []).map((color) =>
      this._createColorValue(color, true)
    );
    this.state = {
      colors: initialColors,
      filters: [],
    };
  }
  private _createColorValue = (
    value: Color["value"],
    isPredefined = false
  ): Color => {
    return { id: createRandomId(), value, isPredefined };
  };

  private fillColors = () => {
    const squares = document.body.querySelectorAll(
      ".color-preview[data-color]"
    );

    [...squares].forEach((_square) => {
      const square = _square as HTMLElement;
      const color = square.dataset.color as string;
      square.style.background = color;
    });
  };

  public addSquare = async (value: Color["value"]) => {
    const newColor = this._createColorValue(value);

    await this.setState((prevState) => ({
      colors: [...prevState.colors, newColor],
    }));

    this.fillColors();
  };

  componentDidMount() {
    this.fillColors();
  }

  render() {
    const { filters, colors } = this.state;
    const filteredColors = reduceFilters(filters, colors);
    const sortedColors = sortColors(filteredColors);

    const changeFilterCallback = async (filters: ColorFilter[]) => {
      await this.setState({ filters });
      this.fillColors();
    };

    return (
      <main>
        <AddSquareForm addSquare={this.addSquare} />
        <FilterColorForm changeFilter={changeFilterCallback} />
        <section className="square-container">
          {sortedColors.map((color) => (
            <Square key={color.id} {...color} />
          ))}
        </section>
      </main>
    );
  }
}
