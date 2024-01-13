import { useSearchParams } from "react-router-dom";
import Select from "./Select";

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOptionChange = (e) => {
    searchParams.set("sortby", e.target.value);
    setSearchParams(searchParams);
  };

  const value = searchParams.get("sortby") || "name-asc";
  return (
    <Select
      onChange={handleOptionChange}
      value={value}
      options={options}
      type='white'
    />
  );
};

export default SortBy;
