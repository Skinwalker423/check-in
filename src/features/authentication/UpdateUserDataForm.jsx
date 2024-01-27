import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import useUserSession from "./useUserSession";
import useUpdateUser from "./useUpdateUser";

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUserSession();
  const { updateUser, isLoading } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (!fullName) return;

    updateUser(
      { avatar, fullName },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  const handleCancel = () => {
    setFullName(currentFullName);
    setAvatar(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label='Email address'>
        <Input value={email} disabled />
      </FormRow>
      <FormRow label='Full name'>
        <Input
          type='text'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id='fullName'
        />
      </FormRow>
      <FormRow label='Avatar image'>
        <FileInput
          id='avatar'
          accept='image/*'
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button
          disabled={isLoading}
          type='reset'
          variation='secondary'
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
