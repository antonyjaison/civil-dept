
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
    return JSON.parse(localStorage.getItem('email'))
}

export {setUser , isUserExist,getUser}