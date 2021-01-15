export default async function checkSignedIn(getState, dispatch) {
  if (getState().account.token == null)
    throw new Error("Account is not signed in.");
}
