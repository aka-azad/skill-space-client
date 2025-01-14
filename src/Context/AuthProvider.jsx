import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = GoogleAuthProvider;

  const createUserWithEmailPass = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signinWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const signinWithEmailPass = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((acc) => {
      setUser(acc);
      setLoading(false);
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  const contextValues = {
    user,
    loading,
    createUserWithEmailPass,
    signinWithGoogle,
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
