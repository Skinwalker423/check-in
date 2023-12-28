import supabase from "./supabase";

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
export async function createCabin({
  name,
  maxCapacity,
  regularPrice,
  discount,
  description,
}) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([
      {
        name,
        maxCapacity,
        regularPrice,
        discount,
        description,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("problem creating cabin");
  }

  return data;
}
