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

  const { data: uploadData, error: uploadError } =
    await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabin.image);

  console.log("upload data", uploadData);

  if (uploadError) {
    console.error(uploadError);
    await deleteCabin(data.id);
    throw new Error(
      "problem uploading image and cabin was not created. Try again."
    );
  }

  return data;
}
