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

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return user;
}
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();

  if (!data?.session) return null;

  if (error) {
    throw new Error(error.message);
  }

  const user = await getUser();

  return user;
}

export const signup = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
