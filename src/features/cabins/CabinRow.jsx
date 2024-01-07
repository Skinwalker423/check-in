import { useContext } from "react";
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

import useDeleteCabin from "./useDeleteCabin";
import useCreateCabin from "./useCreateCabin";

import Spinner from "../../ui/Spinner";
import EditCabinForm from "./EditCabinForm";
import { HiPencil } from "react-icons/hi2";
import { HiSquare2Stack } from "react-icons/hi2";
import { HiMiniTrash } from "react-icons/hi2";
import Modal, { ModalContext } from "../../ui/Modal";

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

// const Wrapper = styled.div`
//   display: flex;
//   gap: 2rem;
// `;

const CabinRow = ({ cabin }) => {
  const {
    name,
    image,
    maxCapacity,
    regularPrice,
    discount,
    id,
  } = cabin;

  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { createCabin, isCreating } = useCreateCabin();

  const { onClose } = useContext(ModalContext);

  const handleCopyCabin = () => {
    console.log("copying");
    createCabin({
      name: `${cabin.name}-copy`,
      image,
      maxCapacity,
      regularPrice,
      discount,
    });
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
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button
            onClick={handleCopyCabin}
            disabled={isDeleting || isCreating}
          >
            <HiSquare2Stack />
          </button>
          <Modal>
            <Modal.Open opens={"edit"}>
              <button disabled={isDeleting || isCreating}>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Content name={"edit"}>
              <EditCabinForm
                cabinToEdit={cabin}
                onClose={onClose}
              />
            </Modal.Content>
          </Modal>

          <button
            disabled={isDeleting || isCreating}
            onClick={() => deleteCabin(id)}
          >
            {isDeleting ? <Spinner /> : <HiMiniTrash />}
          </button>
        </div>
      </TableRow>
    </>
  );
};

export default CabinRow;
