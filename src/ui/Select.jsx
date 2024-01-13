import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

const Select = ({ value, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOptionChange = (e) => {
    console.log(e.target.value);
    searchParams.set("filter", e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <StyledSelect
      onChange={handleOptionChange}
      value={value}
    >
      {options.map((option) => {
        return (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        );
      })}
    </StyledSelect>
  );
};

export default Select;
