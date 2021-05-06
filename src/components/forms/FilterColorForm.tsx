import React, { FormEvent } from "react";

import { Color } from "types";

interface FilterColorFormProps {
  filterColor: (value: Color["value"]) => void;
}

const areEqualBetweenRenders = (
  prevProps: FilterColorFormProps,
  nextProps: FilterColorFormProps
): boolean => prevProps.filterColor === nextProps.filterColor;

export const FilterColorForm: React.FC<FilterColorFormProps> = React.memo(
  ({ filterColor }) => {
    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
      // prevent page reload upon form submit
      e.preventDefault();

      const form = new FormData(e.target as HTMLFormElement);
      const color = form.get("color");

      filterColor(color as string);
    };

    return (
      <form className="filter-color-form" onSubmit={handleFormSubmit}>
        <fieldset>
          <label htmlFor="red-filter">Red &gt; 50%</label>
          <input type="checkbox" id="red-filter" />
          <label htmlFor="blue-filter">Blue &gt; 50%</label>
          <input type="checkbox" id="blue-filter" />
          <label htmlFor="green-filter">Green &gt; 50%</label>
          <input type="checkbox" id="green-filter" />
          <label htmlFor="saturation-filter">Saturation &gt; 50%</label>
          <input type="checkbox" id="saturation-filter" />
        </fieldset>
      </form>
    );
  },
  areEqualBetweenRenders
);
