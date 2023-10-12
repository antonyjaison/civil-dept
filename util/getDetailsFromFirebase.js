import { query, collection, orderBy, getDocs } from "firebase/firestore";
import db from "@firebase/config";

const getDetailsFromFirebase = async (collectionName) => {
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return data
}

export default getDetailsFromFirebase;