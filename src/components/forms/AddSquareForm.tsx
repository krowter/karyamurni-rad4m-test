import React, { FormEvent, useState } from "react";

import { validateColorInput } from "../../helpers";

import { Color } from "types";

interface AddSquareFormProps {
  addSquare: (value: Color["value"]) => void;
}

const areEqualBetweenRenders = (
  prevProps: AddSquareFormProps,
  nextProps: AddSquareFormProps
): boolean => prevProps.addSquare === nextProps.addSquare;

export const AddSquareForm: React.FC<AddSquareFormProps> = React.memo(
  ({ addSquare }) => {
    const [isInputValid, setIsInputValid] = useState(false);

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
      // prevent page reload upon form submit
      e.preventDefault();

      const form = new FormData(e.currentTarget);
      const color = form.get("color");

      addSquare(color as string);
    };

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
      const color = e.currentTarget.value;
      const isValid = Boolean(color) && validateColorInput(color as string);

      setIsInputValid(isValid);
    };

    return (
      <form className="add-square-form" onSubmit={handleFormSubmit}>
        <label htmlFor="new-color-input">Add new color</label>
        {/* 7 is color in hex format + "#" at the beginning */}
        <input
          id="new-color-input"
          maxLength={7}
          name="color"
          onChange={handleInputChange}
        />
        <button disabled={!isInputValid} type="submit">
          Add
        </button>
        {!isInputValid && (
          <span className="warning-text">
            Please enter a valid hex color value (begins with #)
          </span>
        )}
      </form>
    );
  },
  areEqualBetweenRenders
);
