const File = ({ params }) => {
  const { fileID } = params;
  const iframeStyles = {
    width: "100%",
    height: "100%",
    border: "none",
  };

  return (
    <div style={{ height: "100vh" }}>
      <iframe
        style={iframeStyles}
        src={`https://drive.google.com/file/d/${fileID}/preview`}
        title="Embedded File"
      ></iframe>
    </div>
  );
};

export default File;
