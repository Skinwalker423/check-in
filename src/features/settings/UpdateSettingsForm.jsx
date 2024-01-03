import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";

function UpdateSettingsForm() {
  const { error, isLoading, settings } = useSettings();

  console.log("settings", settings, error, isLoading);

  const { getValues, register } = useForm({
    defaultValues: {
      ...settings,
    },
  });
  const values = getValues();
  console.log("values", values);

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='minBookingLength
          '
          {...register("minBookingLength", {
            required: "enter min nights",
          })}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='maxBookingLength'
          {...register("maxBookingLength", {
            required: "enter max nights",
          })}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='maxGuestsPerBooking'
          {...register("maxGuestsPerBooking", {
            required: "enter min nights",
          })}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfastPrice'
          {...register("breakfastPrice", {
            required: "enter min nights",
          })}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
