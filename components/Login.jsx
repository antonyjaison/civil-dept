import styles from "@styles/login.module.scss";

const Login = () => {
  return (
    <div className={styles.login_wrapper}>
      <div className={styles.form_section}>
        <div className={styles.heading}>
          <h1>Login</h1>
          <img src="/icons/menu.svg" alt="" />
        </div>

        <form>
          <div className={styles.input_section}>
            <label>Email</label>
            <br/>
            <input type="text" placeholder="exaple@gmail.com" />
          </div>
          <div className={styles.input_section}>
            <label>Password</label>
            <br/>
            <input type="text" placeholder="********" />
          </div>
          <button>Login</button>
        </form>




      </div>
    </div>
  );
};

export default Login;
