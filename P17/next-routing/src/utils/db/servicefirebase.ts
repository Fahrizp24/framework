import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  addDoc,
  where,
  updateDoc
} from "firebase/firestore";
import bcrypt from "bcryptjs";
import app from "./firebase";

const db = getFirestore(app);

export async function retrieveProducts(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataByID(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function signup(
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
  },
  callback: Function,
) {
  const q = query(
    collection(db, "users"),
    where("email", "==", userData.email),
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    callback({
      status: "error",
      message: "User already exists",
    });
  } else {
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "member";
    
    await addDoc(collection(db, "users"), userData)
      .then(() => {
        callback({
          status: "success",
          message: "User registered successfully",
        });
      })
      .catch((error) => {
        callback({
          status: "error",
          message: error.message,
        });
      });
  }
}

export async function signIn(email: string) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    return data[0];
  } else {
    return null;
  }
}

export async function signInWithOAuth(userData: any, provider: string, callback: any) {
  try {
    const q = query(
      collection(db, "users"),
      where("email", "==", userData.email)
    );
    const querySnapshot = await getDocs(q);
    const data: any = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (data.length > 0) {
      // User sudah ada, pertahankan role yang ada
      userData.role = data[0].role;
      await updateDoc(doc(db, "users", data[0].id), userData);
      callback({
        status: true,
        message: `User logged in with ${provider}`,
        data: userData,
      });
    } else {
      // User baru, set default role member dan simpan ke DB
      userData.role = "member";
      await addDoc(collection(db, "users"), userData);
      callback({
        status: true,
        message: `User registered and logged in with ${provider}`,
        data: userData,
      });
    }
  } catch (error: any) {
    callback({
      status: false,
      message: `Failed to register user with ${provider}`,
    });
  }
}