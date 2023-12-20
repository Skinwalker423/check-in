import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import styled from "styled-components";
import Row from "./ui/Row";

const StyledApp = styled.main`
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type='vertical'>
          <Row>
            <Heading as='h1'>Hello World</Heading>

            <Row type='vertical'>
              <Input
                type='text'
                placeholder='Enter username'
                id='name'
                name='name'
              />
              <Button>Submit</Button>
              <Button size='large' variation='secondary'>
                Submit
              </Button>
            </Row>
          </Row>
          <Row type='vertical'>
            <Heading as='h3'>Form</Heading>
            <form action=''>
              <Input
                placeholder='Number of guests'
                type='number'
              />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
