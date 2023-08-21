
const setUser = (email) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("email", JSON.stringify(email));
  }
};

const isUserExist = () => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem("email")? true : false;
  }

  return false;
};

const getUser = () => {
  // if (typeof localStorage !== "undefined") {
  return JSON.parse(localStorage.getItem("email"));
  // }

  return null;
}

export {setUser , isUserExist,getUser}