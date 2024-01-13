import { useSearchParams } from "react-router-dom";
import Select from "./Select";

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOptionChange = (e) => {
    console.log("value", value);
    searchParams.set("filter", e.target.value);
    setSearchParams(searchParams);
  };
  console.log("options", options);
  const value = searchParams.get("filter") || "name-asc";
  return (
    <Select
      onChange={handleOptionChange}
      value={value}
      options={options}
    />
  );
};

export default SortBy;
