import * as AccountActions from "../modules/account/actions";

export default async function handleRespons(dispatch, respons) {
  if (!respons.ok) {
    if (respons.status === 403) await dispatch(AccountActions.signOut());
    throw new Error(await respons.text());
  }
  return await respons.json();
}
