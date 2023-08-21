import db from "@firebase/config";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

export async function GET(request) {
    const q = query(collection(db, 'favorites'), orderBy('created', 'desc'));

    try {
        // const querySnapshot = await getDocs(q);
        // const tasks = querySnapshot.docs.map(doc => ({
        //     id: doc.id,
        //     data: doc.data()
        // }));
        
        // return { body: JSON.stringify(tasks) };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { status: 500, body: "Internal Server Error" };
    }
}
