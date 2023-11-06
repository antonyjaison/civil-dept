import { NextResponse } from "next/server";
import { zfd } from "zod-form-data";
import { z } from "zod";
import { Timestamp, collection, doc, getDoc, setDoc } from "firebase/firestore";
import db from "@firebase/config";

const schema = zfd.formData({
  email: zfd.text(z.string().min(5).max(30)),
  password: zfd.text(z.string().min(3).max(30)),
});


export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const data = schema.safeParse({
      email,
      password,
    });

    console.log(data.data);

    if (data.error) {
      return NextResponse.json(data.error, {
        status: 400,
      });
    }


    if (
      data.data.email.includes("gecskp.ac.in") &&
      data.data.email.includes("ce") &&
      data.data.password === process.env.LOGIN_PASSWORD
    ) {
      const usersCollectionRef = collection(db, "users");
      const docRef = doc(usersCollectionRef, data.data.email);

      try {
        const docSnap = await getDoc(docRef);
        // console.log("Exists", docSnap.exists());

        if (!docSnap.exists()) {
          // If the document does not exist, set the data for the new document

          await setDoc(docRef, {
            email: data.data.email,
            timestamp: Timestamp.now(),
          });
          // console.log("user is setted");
          return NextResponse.json({ success: true, email: data.data.email });
        } else {
          // If the document already exists, you can handle the situation accordingly
          // console.log("User with this email already exists.");
          // setUser(docSnap.data().email);
        }
      } catch (error) {
        return NextResponse.json(
          {
            success: false,
            message: error,
          },
          {
            status: 500,
          }
        );
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        {
          status: 403,
        }
      );
    }

    return NextResponse.json({ success: true, email: data.data.email });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
