import useCabins from "./useCabins";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import ErrorFallback from "../../ui/ErrorFallback";
import Table from "../../ui/Table";

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

export default function CabinTable() {
  const { cabins, isLoading, error } = useCabins();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorFallback error={error} />;

  return (
    <Table columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
      <Table.Header
        columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}
      >
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={cabins}
        render={(cabin) => {
          return <CabinRow key={cabin.id} cabin={cabin} />;
        }}
      />
    </Table>
  );
}
