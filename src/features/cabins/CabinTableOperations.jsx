import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
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
      <SortBy
        options={[
          { value: "name", label: "Sort by name (A-Z)" },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;
