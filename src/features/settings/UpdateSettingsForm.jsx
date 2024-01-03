import { useForm } from "react-hook-form";

import { useSettings } from "./useSettings";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

function UpdateSettingsForm() {
  const { error, isLoading, settings } = useSettings();

  console.log("settings", settings, error, isLoading);

  const { getValues, register, handleSubmit, formState } =
    useForm({
      defaultValues: {
        ...settings,
      },
    });

  const { errors } = formState;
  const values = getValues();
  console.log("values", values);

  const onSubmit = () => {
    console.log("submitted");
  };

  const onError = (errors) => {
    console.log(errors);
  };

  console.log("errors", errors);

  if (isLoading) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow
        label='Minimum nights/booking'
        error={errors?.minBookingLength?.message}
      >
        <Input
          type='number'
          id='minBookingLength
          '
          defaultValue={settings?.minBookingLength}
          {...register("minBookingLength", {
            required: "enter min nights",
          })}
        />
      </FormRow>
      <FormRow
        label='Maximum nights/booking'
        error={errors?.maxBookingLength?.message}
      >
        <Input
          type='number'
          id='maxBookingLength'
          defaultValue={settings?.maxBookingLength}
          {...register("maxBookingLength", {
            required: "enter max nights",
          })}
        />
      </FormRow>
      <FormRow
        label='Maximum guests/booking'
        error={errors?.maxGuestsPerBooking?.message}
      >
        <Input
          type='number'
          id='maxGuestsPerBooking'
          defaultValue={settings?.maxBookingLength}
          {...register("maxGuestsPerBooking", {
            required: "enter max guests",
          })}
        />
      </FormRow>
      <FormRow
        label='Breakfast price'
        error={errors?.breakfastPrice?.message}
      >
        <Input
          type='number'
          id='breakfastPrice'
          defaultValue={settings?.breakfastPrice}
          {...register("breakfastPrice", {
            required: "enter breakfast price",
          })}
        />
      </FormRow>
      <button type='submit'>Update Settings</button>
    </Form>
  );
}

export default UpdateSettingsForm;
