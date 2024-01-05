import { createContext, useContext, useState } from "react";
import Button from "./Button";

const CounterContext = createContext();

const Counter = ({ children }) => {
  const [count, setCount] = useState(0);

  const increase = () => setCount((count) => count + 1);
  const decrease = () => setCount((count) => count - 1);

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
function Decrease({ icon }) {
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

Counter.Count = Count;
Counter.Increase = Increase;
Counter.Decrease = Decrease;
Counter.Label = Label;

export default Counter;
