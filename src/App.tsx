import React from "react";
import "./App.scss";

import { Square } from "./components/Square";
import { AddSquareForm } from "./components/forms/AddSquareForm";
import { FilterColorForm } from "./components/forms/FilterColorForm";

import { createRandomId } from "./helpers";
import { Color } from "./types";

interface AppState {
  colors: Color[];
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
    this.state = {
      colors: (predefinedColors ?? []).map((color) =>
        this._createColorValue(color, true)
      ),
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

  public addSquare = (value: Color["value"]): void => {
    const newColor = this._createColorValue(value);

    this.setState((prevState) => ({
      colors: [...prevState.colors, newColor],
    }));
  };

  componentDidMount() {
    this.fillColors();
  }

  render() {
    return (
      <main>
        <AddSquareForm addSquare={this.addSquare} />
        <FilterColorForm filterColor={this.addSquare} />
        <section className="square-container">
          {this.state.colors.map((color) => (
            <Square key={color.id} {...color} />
          ))}
        </section>
      </main>
    );
  }
}
