import { supabaseUrl } from "./supabase";

export async function updateUser({
  avatar,
  fullName,
  currentAvatar,
  password,
}) {
  const imageName = `${Math.random()}-${
    avatar.name
  }`.replace("/", "");
  const imagePath = avatar
    ? `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`
    : currentAvatar;

  const dataProps = password
    ? { password, avatar: imagePath, fullName }
    : { avatar: imagePath, fullName };

  const { data, error } = await supabase.auth.updateUser({
    data: dataProps,
  });

  if (error) {
    console.error(error);
    throw new Error("problem updating avatar");
  }

  if (avatar) {
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(imageName, avatar);

    if (uploadError) {
      console.error(uploadError);
      await supabase.auth.updateUser({
        data: {
          avatar: currentAvatar || "/img/default-user.jpg",
        },
      });
      throw new Error(
        "problem uploading image. Try again."
      );
    }
  }

  return data;
}
