
const setUser = (email) => {
  localStorage.setItem("email", JSON.stringify(email));
};

const isUserExist = () => {
  return localStorage.getItem("email") ? true : false;
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("email"));
};

export {setUser , isUserExist,getUser}