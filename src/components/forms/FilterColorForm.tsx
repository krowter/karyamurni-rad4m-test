import React, { FormEvent } from "react";

import { parseHexColor } from "../../helpers";

import { Color, ColorFilter } from "types";

interface FilterColorFormProps {
  changeFilter: (filters: ColorFilter[]) => void;
}

const areEqualBetweenRenders = (
  prevProps: FilterColorFormProps,
  nextProps: FilterColorFormProps
): boolean => prevProps.changeFilter === nextProps.changeFilter;

const redFilter = (color: Color) => parseHexColor(color.value).r > 127;
const greenFilter = (color: Color) => parseHexColor(color.value).g > 127;
const blueFilter = (color: Color) => parseHexColor(color.value).b > 127;
const saturationFilter = (color: Color) =>
  parseHexColor(color.value).saturation > 50;

export const FilterColorForm: React.FC<FilterColorFormProps> = React.memo(
  ({ changeFilter }) => {
    const handleFormChange = (e: FormEvent<HTMLFormElement>) => {
      const form = new FormData(e.currentTarget);

      const filters = [
        form.get("red-filter") && redFilter,
        form.get("blue-filter") && blueFilter,
        form.get("green-filter") && greenFilter,
        form.get("saturation-filter") && saturationFilter,
      ].filter(Boolean) as ColorFilter[];

      changeFilter(filters);
    };

    return (
      <form className="filter-color-form" onChange={handleFormChange}>
        <fieldset>
          <label htmlFor="red-filter">Red &gt; 50%</label>
          <input
            value="red-filter"
            type="checkbox"
            id="red-filter"
            name="red-filter"
          />
          <label htmlFor="blue-filter">Blue &gt; 50%</label>
          <input
            value="blue-filter"
            type="checkbox"
            id="blue-filter"
            name="blue-filter"
          />
          <label htmlFor="green-filter">Green &gt; 50%</label>
          <input
            value="green-filter"
            type="checkbox"
            id="green-filter"
            name="green-filter"
          />
          <label htmlFor="saturation-filter">Saturation &gt; 50%</label>
          <input
            value="saturation-filter"
            type="checkbox"
            id="saturation-filter"
            name="saturation-filter"
          />
        </fieldset>
      </form>
    );
  },
  areEqualBetweenRenders
);
