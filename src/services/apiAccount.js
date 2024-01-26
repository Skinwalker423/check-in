import { supabaseUrl } from "./supabase";

export async function updateUser({
  avatar,
  fullName,
  currentAvatar,
}) {
  const imageName = `${Math.random()}-${
    avatar.name
  }`.replace("/", "");
  const imagePath = avatar.name
    ? `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`
    : avatar;

  const { data, error } = await supabase.auth.updateUser({
    data: { avatar: imagePath, fullName },
  });

  if (error) {
    console.error(error);
    throw new Error("problem updating avatar");
  }

  if (avatar.name) {
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
