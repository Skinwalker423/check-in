import { useSearchParams } from "react-router-dom";
import Select from "./Select";

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOptionChange = (e) => {
    searchParams.set("sortby", e.target.value);
    setSearchParams(searchParams);
  };

  const sortByValue =
    searchParams.get("sortby") || "name-asc";
  return (
    <Select
      onChange={handleOptionChange}
      value={sortByValue}
      options={options}
      type='white'
    />
  );
};

export default SortBy;
