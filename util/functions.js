const setUser = (email) => {
    localStorage.setItem('email',JSON.stringify(email))
}

const isUserExist = () => {
    return!!localStorage.getItem("email")? JSON.parse(localStorage.getItem('email')) : false;
}

export {setUser , isUserExist}