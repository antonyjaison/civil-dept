const setUser = (email) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("email", JSON.stringify(email));
  }
};

const isUserExist = () => {
  if (typeof localStorage !== "undefined") {
    return !!localStorage.getItem("email")
      ? JSON.parse(localStorage.getItem("email"))
      : false;
  }

  return false;
};

export {setUser , isUserExist}