import React from "react";

import { Color } from "types";

type SquareProps = Color & { removeSquare: (id: string) => void };

export const Square: React.FC<SquareProps> = ({
  id,
  value: color,
  isPredefined = false,
  removeSquare,
}) => {
  return (
    <div className="square">
      <div className="color-preview" data-color={color}></div>
      <div className="controls">
        <span className="color-value">{color.toUpperCase()}</span>
        {/* built-in colors can't be removed */}
        {!isPredefined && (
          <button className="remove-button" onClick={() => removeSquare(id)}>
            &#10006;
          </button>
        )}
      </div>
    </div>
  );
};
