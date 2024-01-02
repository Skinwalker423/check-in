import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import useEditCabin from "./useEditCabin";

function EditCabinForm({ cabinToEdit, toggleShowForm }) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState,
  } = useForm({
    defaultValues: { ...cabinToEdit },
  });

  const { errors } = formState;

  const { isEditing, updateCabin } = useEditCabin();

  const onSubmit = (data) => {
    updateCabin(
      {
        ...data,
        image:
          typeof data.image === "object"
            ? data.image[0]
            : data.image,
      },
      {
        onSuccess: (data) => {
          console.log("edited data", data);
          reset();
          toggleShowForm();
        },
      }
    );
  };

  const onError = (errors) => {
    console.log("errors", errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow
        label={"Cabin Name"}
        error={errors?.name?.message}
      >
        <Input
          type='text'
          id='name'
          disabled={isEditing}
          {...register("name", {
            required: "Please enter a name",
          })}
        />
      </FormRow>

      <FormRow
        label={"Maximum capacity"}
        error={errors?.maxCapacity?.message}
      >
        <Input
          type='number'
          id='maxCapacity'
          disabled={isEditing}
          {...register("maxCapacity", {
            required: "Max capacity required",
            min: {
              value: 1,
              message: "Minimum has to be 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        error={errors?.regularPrice?.message}
        label={"Regular Price"}
      >
        <Input
          type='number'
          id='regularPrice'
          disabled={isEditing}
          {...register("regularPrice", {
            required: "Regular price required",
            min: {
              value: 1,
              message: "Price has to be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        error={errors?.discount?.message}
        label={"Discount"}
      >
        <Input
          type='number'
          id='discount'
          disabled={isEditing}
          {...register("discount", {
            validate: (value) => {
              const regPrice = getValues("regularPrice");

              return (
                parseInt(value) <= parseInt(regPrice) ||
                "Discount greater than the price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        error={errors?.description?.message}
        label={"Description for website"}
      >
        <Textarea
          type='number'
          id='description'
          disabled={isEditing}
          {...register("description", {
            required: "description required",
          })}
        />
      </FormRow>

      <FormRow
        label={"Cabin Photo"}
        error={errors?.image?.message}
      >
        <FileInput
          id='image'
          accept='image/*'
          disabled={isEditing}
          {...register("image")}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          disabled={isEditing}
          variation='secondary'
          type='reset'
        >
          Cancel
        </Button>
        <Button disabled={isEditing}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default EditCabinForm;
