import React, { FormEvent } from "react";

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
    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
      // prevent page reload upon form submit
      e.preventDefault();

      const form = new FormData(e.target as HTMLFormElement);
      const color = form.get("color");

      addSquare(color as string);
    };

    return (
      <form className="add-square-form" onSubmit={handleFormSubmit}>
        <label htmlFor="new-color-input">Add new color</label>
        <input id="new-color-input" name="color" />
        <button type="submit">Add</button>
      </form>
    );
  },
  areEqualBetweenRenders
);
