import { useState } from "react";
import { useSettings } from "./useSettings";
import { useEditSetting } from "./useEditSettings";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import ErrorFallback from "../../ui/ErrorFallback";

const errorsConfig = {
  minBookingLength: "enter min length",
  maxBookingLength: "enter max length",
  breakfastPrice: "Price must be greater than 0",
  maxGuestsPerBooking: "cannot be empty",
};

const defaultErrors = {
  minBookingLength: null,
  maxBookingLength: null,
  breakfastPrice: null,
  maxGuestsPerBooking: null,
};

function UpdateSettingsForm() {
  const [errorMsg, setErrorMsg] = useState(defaultErrors);
  const { error, isLoading, settings } = useSettings();
  const { isUpdating, updateSetting } = useEditSetting();

  const handleOnBlur = (e, editedValue) => {
    setErrorMsg(defaultErrors);
    const value = e.target?.value;

    if (!value || parseInt(value) === 0) {
      setErrorMsg((prevErrors) => {
        return {
          ...prevErrors,
          [editedValue]: errorsConfig[editedValue],
        };
      });

      return;
    }
    if (parseInt(settings[editedValue]) === parseInt(value))
      return;

    updateSetting({ [editedValue]: value });
  };
  if (error) return <ErrorFallback>{error}</ErrorFallback>;
  if (isLoading) return <Spinner />;
  console.log("errors", errorMsg);

  return (
    <Form>
      <FormRow
        label='Minimum nights/booking'
        error={errorMsg?.minBookingLength}
      >
        <Input
          type='number'
          id='minBookingLength'
          disabled={isUpdating}
          onBlur={(e) =>
            handleOnBlur(e, "minBookingLength")
          }
          defaultValue={settings?.minBookingLength}
        />
      </FormRow>
      <FormRow
        label='Maximum nights/booking'
        error={errorMsg?.maxBookingLength}
      >
        <Input
          type='number'
          id='maxBookingLength'
          defaultValue={settings?.maxBookingLength}
          onBlur={(e) =>
            handleOnBlur(e, "maxBookingLength")
          }
        />
      </FormRow>
      <FormRow
        label='Maximum guests/booking'
        error={errorMsg?.maxGuestsPerBooking}
      >
        <Input
          type='number'
          id='maxGuestsPerBooking'
          defaultValue={settings?.maxBookingLength}
          onBlur={(e) =>
            handleOnBlur(e, "maxGuestsPerBooking")
          }
        />
      </FormRow>
      <FormRow
        label='Breakfast price'
        error={errorMsg?.breakfastPrice}
      >
        <Input
          type='number'
          id='breakfastPrice'
          defaultValue={settings?.breakfastPrice}
          onBlur={(e) => handleOnBlur(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
