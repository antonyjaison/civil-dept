import styles from '@styles/adminPage.module.scss'

const SelectImage = ({ selectedImage, onChange }) => {
    return (
      <>
        {selectedImage && (
          <div className={styles.image_preview}>
            <img
              style={{
                width: "200px",
              }}
              src={selectedImage}
              alt="Selected"
            />
          </div>
        )}
        <div className={styles.input_group}>
          <label>Image (JPG, JPEG, PNG)</label>
          <input accept=".jpg, .jpeg, .png" type="file" onChange={onChange} />
        </div>
      </>
    );
  };

  export default SelectImage