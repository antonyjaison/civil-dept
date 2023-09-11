import ClipLoader from "react-spinners/ClipLoader";

export default function Loading(){
    return (
        <div style={{
            width:"100%",
            height:"80vh",
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
        }}>
            <ClipLoader color="#000" size={80}/>
        </div>
    )
}