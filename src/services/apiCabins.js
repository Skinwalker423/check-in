import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase
    .from("cabins")
    .select("*");

  if (error) {
    console.error(error);
    throw new Error("problem getting cabins");
  }

  return data;
}
export async function deleteCabin(id) {
  const { error, data } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("problem deleting cabin");
  }

  return data;
}
export async function createCabin(cabin) {
  const imageName = `${Math.random()}-${
    cabin.image.name
  }`.replace("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("problem creating cabin");
  }

  const { error: uploadError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);

  if (uploadError) {
    console.error(uploadError);
    await deleteCabin(data.id);
    throw new Error(
      "problem uploading image and cabin was not created. Try again."
    );
  }

  return data;
}
export async function updateCabin(cabin) {
  const imageName = `${Math.random()}-${
    cabin.image.name
  }`.replace("/", "");
  const imagePath = cabin.image?.name
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : cabin.image;

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...cabin, image: imagePath })
    .eq("id", cabin.id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("problem creating cabin");
  }

  if (cabin.image?.name) {
    const { error: uploadError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabin.image);

    if (uploadError) {
      console.error(uploadError);
      throw new Error(
        "problem uploading image. Try updating the image again."
      );
    }
  }

  return data;
}
