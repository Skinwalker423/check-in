import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    formState: { errors, isLoading },
    handleSubmit,
    register,
  } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);
  };

  const onError = (err) => {
    console.log("error", err);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow
        label='Full name'
        error={errors?.fullName?.message}
      >
        <Input
          {...register("fullName", {
            required: "Must enter full name",
          })}
          type='text'
          id='fullName'
        />
      </FormRow>

      <FormRow
        label='Email address'
        error={errors?.email?.message}
      >
        <Input
          {...register("email", {
            required: "enter a email",
            pattern: /\S+@\S+\.\S+/,
          })}
          type='email'
          id='email'
        />
      </FormRow>

      <FormRow
        label='Password (min 8 characters)'
        error={errors?.password?.message}
      >
        <Input
          {...register("password", {
            required: "Password missing",
          })}
          type='password'
          id='password'
        />
      </FormRow>

      <FormRow
        label='Repeat password'
        error={errors?.passwordConfirm?.message}
      >
        <Input
          {...register("passwordConfirm", {
            required: "Please confirm your password",
          })}
          type='password'
          id='passwordConfirm'
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
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
