import useCabins from "./useCabins";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import ErrorFallback from "../../ui/ErrorFallback";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

export default function CabinTable() {
  const { cabins, isLoading, error } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorFallback error={error} />;

  const filteredValue =
    searchParams.get("discount") || "all";
  let filteredCabins;

  if (filteredValue === "all") filteredCabins = cabins;

  if (filteredValue === "no-discount")
    filteredCabins = cabins.filter(
      (cabin) => cabin.discount === 0
    );
  if (filteredValue === "with-discount")
    filteredCabins = cabins.filter(
      (cabin) => cabin.discount !== 0
    );

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
          data={filteredCabins}
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
