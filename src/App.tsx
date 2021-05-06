import React from "react";
import "./App.scss";

import { Square } from "./components/Square";
import { AddSquareForm } from "./components/forms/AddSquareForm";

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
    return { value, isPredefined };
  };

  public addSquare = (value: Color["value"]): void => {
    const newColor = this._createColorValue(value);

    this.setState((prevState) => ({
      colors: [...prevState.colors, newColor],
    }));
  };

  render() {
    return (
      <main>
        <AddSquareForm addSquare={this.addSquare} />
        <section className="square-container">
          {this.state.colors.map((color) => (
            <Square {...color} />
          ))}
        </section>
      </main>
    );
  }
}
