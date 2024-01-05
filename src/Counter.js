import { createContext } from "react";

// create context
const CounterContext = createContext();

// create parent component

const Counter = () => {
  return <div>Counter</div>;
};

export default Counter;
// create child component to implement common tasks
// add child components to parent component
