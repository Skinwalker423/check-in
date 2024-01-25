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
    if (data.password !== data.passwordConfirm) {
      console.log("not same passwords");
    }
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
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Not a valid email",
            },
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
            minLength: {
              value: 8,
              message:
                "Password needs at least 8 characters",
            },
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
            minLength: {
              value: 8,
              message:
                "Password needs at least 8 characters",
            },
            validate: (value, formValues) => {
              return (
                value === formValues?.password ||
                "passwords do not match"
              );
            },
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
