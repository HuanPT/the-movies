// import { auth, db } from "@/lib/firebase";
// import { createContext, useContext, useEffect, useState } from "react";
// import { useAuthContext } from "./Auth.context";
// import { collection, getDoc, doc } from "firebase/firestore";

// const UserContext = createContext({});

// const useUserContext = () => useContext(UserContext);

// const UserProvider = ({ children }) => {
//   const { user } = useAuthContext();

//   const [userData, setUserData] = useState();

//   useEffect(() => {
//     if (user) {
//       const userRef = collection(db, "users");

//       const docRef = doc(userRef, user.uid);

//       getDoc(docRef)
//         .then((doc) => doc.data())
//         .then((data) => setUserData(data));
//     }
//   }, [user]);

//   return (
//     <UserContext.Provider value={{ userData, setUserData }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export { UserProvider, useUserContext };
