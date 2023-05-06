import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, setUser);

    if (user) {
      const userRef = collection(db, "users");

      const docRef = doc(userRef, user.uid);

      getDoc(docRef)
        .then((doc) => doc.data())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return () => unsubcribe();
  }, [user]); // thêm user vào danh sách dependencies để useEffect được gọi lại khi user thay đổi

  return (
    <AuthContext.Provider value={{ user, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuthContext };
