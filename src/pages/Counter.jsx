import Counter from "../ui/Counter";

const CounterPage = () => {
  return (
    <div>
      <Counter>
        <Counter.Label>Counter</Counter.Label>
        <Counter.Increase />
        <Counter.Decrease />
        <Counter.Count />
      </Counter>
    </div>
  );
};

export default CounterPage;
