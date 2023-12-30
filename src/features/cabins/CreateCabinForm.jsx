import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState,
  } = useForm();

  const { errors } = formState;

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("successfully created a cabin");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
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

  const onSubmit = (data) => {
    console.log("data", data);
    mutate({ ...data, image: data.image[0] });
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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
          defaultValue={0}
          {...register("discount", {
            validate: (value) => {
              const regPrice = getValues("regularPrice");
              console.log("reg price", regPrice);
              console.log(
                "value",
                parseInt(value) < parseInt(regPrice)
              );
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
          disabled={isLoading}
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
          disabled={isLoading}
          {...register("image", {
            required: "Upload an image",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          disabled={isLoading}
          variation='secondary'
          type='reset'
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
