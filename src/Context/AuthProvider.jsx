import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const googleProvider = new GoogleAuthProvider();

  const createUserWithEmailPass = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signinWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const signinWithEmailPass = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPublic
          .post("/jwt", userInfo)
          .then((tokenResponse) => {
            if (tokenResponse.data.token) {
              localStorage.setItem("access-token", tokenResponse.data.token);
              axiosPublic
                .get(`/users/${currentUser.email}`)
                .then((roleResponse) => {
                  setUser({
                    ...currentUser,
                    role: roleResponse.data.role,
                    authorization: roleResponse.data?.authorization,
                  });
                  setLoading(false);
                })
                .catch((error) => {
                  console.error("Error getting user role:", error);
                  setLoading(false);
                });
            }
          })
          .catch((error) => {
            console.error("Error getting JWT:", error);
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosPublic]);
  const contextValues = {
    user,
    loading,
    createUserWithEmailPass,
    signinWithGoogle,
    signOutUser,
    signinWithEmailPass,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
