import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: blue;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <H1>Hello World</H1>
      <Input
        type='text'
        placeholder='Enter username'
        id='name'
        name='name'
      />
      <Button>Submit</Button>
    </>
  );
}

export default App;
