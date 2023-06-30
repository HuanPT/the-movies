import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, setUser);

    const fetchUser = async () => {
      if (user) {
        try {
          const userRef = collection(db, "users");
          const docRef = doc(userRef, user.uid);

          const userSnapshot = onSnapshot(docRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              setUserData(userData);
            } else {
              setUserData(null);
            }
          });

          return userSnapshot; // Trả về hàm userSnapshot để hủy lắng nghe khi cần thiết
        } catch (error) {
          console.error(error);
        }
      } else {
        setUserData(null);
      }
    };
    fetchUser();

    return () => unsubcribe();
  }, [user]); // thêm user vào danh sách dependencies để useEffect được gọi lại khi user thay đổi

  return (
    <AuthContext.Provider value={{ user, userData, setUserData, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuthContext };
