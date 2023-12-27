import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { deleteCabin } from "../../services/apiCabins";
import ErrorFallback from "../../ui/ErrorFallback";
import Spinner from "../../ui/Spinner";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
  const {
    name,
    image,
    maxCapacity,
    regularPrice,
    discount,
    id,
  } = cabin;
  const queryClient = useQueryClient();
  const { error, mutate, isLoading } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    mutationKey: ["delete cabin"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: () => {
      alert("Could not delete");
    },
  });

  if (error) return <ErrorFallback error={error.message} />;

  return (
    <TableRow role='row'>
      <Img
        src={image || "/cabins/cabin-008.jpg"}
        alt={name}
      />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity}</div>
      <Price>{regularPrice}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <button
        disabled={isLoading}
        onClick={() => mutate(id)}
      >
        {isLoading ? <Spinner /> : "Delete"}
      </button>
    </TableRow>
  );
};

export default CabinRow;
