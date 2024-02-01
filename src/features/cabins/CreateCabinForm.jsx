import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";

function CreateCabinForm({ onClose }) {
  const {
    register,
    handleSubmit,
    getValues,
    formState,
    reset,
  } = useForm();

  const { errors } = formState;

  const { createCabin, isCreating } = useCreateCabin();

  const onSubmit = (data) => {
    createCabin(
      {
        ...data,
        image: data.image[0],
      },
      {
        onSuccess: () => {
          reset();
          onClose?.();
        },
      }
    );
  };

  return (
    <Form
      type={onClose ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow
        label={"Cabin Name"}
        error={errors?.name?.message}
      >
        <Input
          type='text'
          id='name'
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          defaultValue={0}
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
          disabled={isCreating}
          defaultValue=''
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
          disabled={isCreating}
          {...register("image", {
            required: "Upload an image",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          onClick={() => onClose?.()}
          disabled={isCreating}
          variation='secondary'
          type='reset'
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
