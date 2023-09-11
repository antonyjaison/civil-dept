// import { NextResponse } from "next/server";
// import { Timestamp, collection, doc, getDocs, setDoc,query,where, addDoc } from "firebase/firestore";
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import db from "@firebase/config";
// import { storage } from "@firebase/config";
// import uploadImageToFirebase from "@util/uploadImage";

// export async function POST(request){

//     const data = await request.formData();
//     const { facilityName,description,image } = Object.fromEntries(data);  

//     console.log(facilityName, description, image )

//     if (facilityName, description, image) {
//         const facilitiesCollectionRef = collection(db, "facilities");
//         const queryRef = query(facilitiesCollectionRef, where("facilityName", "==", facilityName));

        
//         try {
//             const querySnapshot = await getDocs(queryRef);

//             if (querySnapshot.empty) {
//                 uploadImageToFirebase(image, "image")
//                 .then(async (downloadURL) => {
//                   // Handle the uploaded image URL here
//                   console.log("Image URL:", downloadURL);
//                   // Add a Firestore document with the image downloadURL
//                   await setDoc(facilitiesCollectionRef, {
//                     facilityName: facilityName,
//                     description: description,
//                     image: downloadURL, // Store the image URL
//                     timestamp: Timestamp.now(),
//                   });
//                   return NextResponse.json("added");
//                 })
//                 .catch((error) => {
//                   // Handle any errors during the upload
//                   console.error("Error uploading image:", error);
//                   return NextResponse.json(error, {
//                     status: 400
//                 });
//                 });
//             } else {
//                 return NextResponse.json("Facility with this name already exists", {
//                     status: 400
//                 });
//             }
//         } catch (error) {
//             return NextResponse.json(error,{
//                 status:500
//             })
//         }
//     }else{
//         return NextResponse.json("All fields required",{
//             status:400
//         })
//     }
// }
