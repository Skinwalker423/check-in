import useCabins from "./useCabins";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import ErrorFallback from "../../ui/ErrorFallback";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

export default function CabinTable() {
  const { cabins, isLoading, error } = useCabins();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorFallback error={error} />;

  return (
    <Menus>
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
            return (
              <CabinRow key={cabin.id} cabin={cabin} />
            );
          }}
        />
      </Table>
    </Menus>
  );
}
