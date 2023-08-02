
const OpenButton = ({ id }) => {
  const styles = {
    border: "none",
    backgroundColor: "transparent",
  };
  return (
      <button style={styles}>
        <img src="/icons/open.svg" alt="open" />
      </button>
  );
};

export default OpenButton;
