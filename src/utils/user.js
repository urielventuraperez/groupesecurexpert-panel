import { LSUSER } from 'src/utils/environmets';

export const getUser = () => {
  return JSON.parse(localStorage.getItem(LSUSER));
}

export const userInfoName = () => {
  return getUser().name;
}

export const userInfoLastname = () => {
  return getUser().lastname;
}

export const userInfoLastLoggedIn = () => {
  return getUser().last_logged_in;
}

export const userInfoRole = () => {
  return getUser().role;
}

export const userInfoEmail = () => {
  return getUser().email;
}