import { createContext, useContext, useState } from "react";
import Button from "./ui/Button";

// create context
const CounterContext = createContext();

// create parent component

const Counter = ({ children }) => {
  const [count, setCount] = useState(0);

  const increase = () => setCount((count) => count++);
  const decrease = () => setCount((count) => count--);

  const values = {
    count,
    increase,
    decrease,
  };

  return (
    <CounterContext.Provider value={values}>
      {children}
    </CounterContext.Provider>
  );
};

// create child component to implement common tasks

function Count() {
  const { count } = useContext(CounterContext);
  return <span>{count}</span>;
}
function Label({ children }) {
  return <span>{children}</span>;
}
function Increase({ icon }) {
  const { increase } = useContext(CounterContext);
  return (
    <Button
      onClick={increase}
      type='button'
      variation='ghost'
      size={"large"}
    >
      {icon ? icon : "Increase"}
    </Button>
  );
}
function Dncrease({ icon }) {
  const { decrease } = useContext(CounterContext);
  return (
    <Button
      onClick={decrease}
      type='button'
      variation='ghost'
      size={"large"}
    >
      {icon ? icon : "Decrease"}
    </Button>
  );
}

// add child components to parent component

export default Counter;
