import React from "react";

import { Color } from "types";

type SquareProps = Color;

export const Square: React.FC<SquareProps> = ({
  value: color,
  isPredefined = false,
}) => {
  return (
    <div className="square">
      <div className="color-preview" data-color={color}></div>
      <div className="controls">
        <span className="color-value">{color.toUpperCase()}</span>
        {/* built-in colors can't be removed */}
        {!isPredefined && <button className="remove-button">&#10006;</button>}
      </div>
    </div>
  );
};
