import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField={"discount"}
        options={[
          { value: "all", label: "All" },
          { value: "with-discount", label: "Discounted" },
          { value: "no-discount", label: "No Discount" },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;
