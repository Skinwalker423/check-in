import supabase, { supabaseUrl } from "./supabase";

export async function updateUser({
  avatar,
  fullName,
  password,
}) {
  const dataProps = password
    ? { password }
    : { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(
    dataProps
  );

  if (error) {
    console.error(error);
    throw new Error("problem updating profile");
  }

  if (!avatar) return data;

  const imageName = `${Math.random()}-${
    avatar.name
  }`.replace("/", "");

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(imageName, avatar);

  if (uploadError) {
    console.error(uploadError);
    throw new Error("problem uploading image. Try again.");
  }

  const imagePath = `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`;

  const { data: userData, error: avatarError } =
    await supabase.auth.updateUser({
      data: { avatar: imagePath },
    });

  if (avatarError) {
    console.error(avatarError.message);
    throw new Error(
      "problem uploading user metadata. Try again."
    );
  }

  return userData;
}
