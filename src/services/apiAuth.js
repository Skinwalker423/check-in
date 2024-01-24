import supabase from "./supabase";

export async function login({ email, password }) {
  let { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
