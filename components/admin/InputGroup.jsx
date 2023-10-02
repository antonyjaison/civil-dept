import styles from "@styles/adminPage.module.scss";

const InputGroup = ({
  name,
  setName,
  type,
  nameFor,
  inputRef,
  placeholder,
}) => {
  const onChangeText = (e) => {
    inputRef.current.style.border = "none";
    setName(e.target.value);
  };

  return (
    <>
      <div className={styles.input_group}>
        <label>{nameFor}</label>
        <input
          ref={inputRef}
          onChange={onChangeText}
          type={type}
          value={name}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default InputGroup;
