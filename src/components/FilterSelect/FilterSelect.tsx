import { useEffect, useState } from "react";
import "./FilterSelect.scss";
import Select, {
  type CSSObjectWithLabel,
  type SingleValue,
} from "react-select";
import { type FilterOption } from "../../pages/ProductPage/ProductPage";
import { useSearchParams } from "react-router-dom";

type Props = {
  options: FilterOption[];
  width: number;
  selectedValue: string;
  sortBy?: boolean; // True if select is sortBy select
};

const FilterSelect = ({ options, width, selectedValue, sortBy }: Props) => {
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    let newDefaultValue = options.find((item) => item.value === selectedValue);
    if (!newDefaultValue) {
      newDefaultValue = sortBy
        ? { value: "age", label: "newest" }
        : { value: "all", label: "all" };
    }
    setDefaultValue(newDefaultValue);
  }, [selectedValue, sortBy, options]);

  const [defaultValue, setDefaultValue] = useState(() => {
    let defaultVal = options.find((item) => item.value === selectedValue);
    if (!defaultVal) {
      defaultVal = sortBy
        ? { value: "age", label: "newest" }
        : { value: "all", label: "all" };
    }
    return defaultVal;
  });

  const onChangeHandle = (e: SingleValue<{ value: string; label: string }>) => {
    if (e?.value) {
      if (sortBy) {
        if (e?.value !== "age") {
          params.set("sort", e.value);
          setParams(params, { replace: true });
        } else {
          params.delete("sort");
          setParams(params, { replace: true });
        }
      } else {
        if (e?.value !== "all") {
          params.set("perPage", e.value);
          setParams(params, { replace: true });
        } else {
          params.delete("perPage");
          setParams(params, { replace: true });
        }
      }
    }
  };

  const colourStyles = {
    control: (
      styles: CSSObjectWithLabel,
      { isFocused }: { isFocused: boolean }
    ) => ({
      ...styles,
      "&:hover": {
        borderColor: "#89939A",
      },
      borderColor: isFocused ? "#313237" : "#B4BDC4",
      boxShadow: "none",
      width: width,
    }),
    option: (
      styles: CSSObjectWithLabel,
      { isSelected }: { isSelected: boolean }
    ) => ({
      ...styles,
      "&:hover": {
        backgroundColor: "#FAFBFC",
        color: "#313237",
      },
      backgroundColor: isSelected ? "white" : "",
      color: isSelected ? "#89939A" : "",
    }),
  };
  return (
    <Select
      value={defaultValue}
      options={options}
      components={{ IndicatorSeparator: () => null }}
      styles={colourStyles}
      classNames={{
        control: () => "control",
        option: () => "option",
      }}
      isSearchable={false}
      onChange={onChangeHandle}
    />
  );
};

export default FilterSelect;
