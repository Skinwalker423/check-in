import styled from "styled-components";

const Input = styled.input`
  border: 1px solid #ddd;
  font-size: 1.4rem;
  font-weight: 600;
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
  &:focus {
    outline: none;
    border: 1px solid #9d3939;
  }
`;

export default Input;
