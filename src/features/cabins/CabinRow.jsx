import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { deleteCabin } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import { useState } from "react";
import EditCabinForm from "./EditCabinForm";

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

const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
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
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    mutationKey: ["delete cabin"],
    onSuccess: () => {
      toast.success("Successfully deleted cabin");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message, {
        duration: 7000,
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    },
  });

  const toggleShowForm = () => {
    setShowForm((prevState) => !prevState);
  };

  return (
    <>
      <TableRow role='row'>
        <Img
          src={image || "/cabins/cabin-008.jpg"}
          alt={name}
        />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity}</div>
        <Price>{regularPrice}</Price>
        {!discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <Wrapper>
          <button
            disabled={isLoading}
            onClick={toggleShowForm}
          >
            {isLoading ? <Spinner /> : "Edit"}
          </button>

          <button
            disabled={isLoading}
            onClick={() => mutate(id)}
          >
            {isLoading ? <Spinner /> : "Delete"}
          </button>
        </Wrapper>
      </TableRow>
      {showForm && (
        <EditCabinForm
          cabinToEdit={cabin}
          toggleShowForm={toggleShowForm}
        />
      )}
    </>
  );
};

export default CabinRow;
