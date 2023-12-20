import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";

function App() {
  return (
    <>
      <GlobalStyles />
      <Heading as='h1'>Hello World</Heading>
      <Heading as='h2'>Hello World</Heading>
      <Heading as='h3'>Hello World</Heading>
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
