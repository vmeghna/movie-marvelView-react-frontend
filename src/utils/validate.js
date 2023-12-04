export const checkValidData = (email, password) => {
  const isEmailvalid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/.test(password);

  if (!isEmailvalid) {
    return "Email Id is not valid";
  }

  if (!isPasswordValid) {
    return "Password should contain minimum 8 characters , atleast 1 uppercase, 1 lowercase and 1 number";
  }

  return null;
};
