import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../../src/Firebase/firebase.config"
import PropTypes from 'prop-types';
import axios from "axios";


export const AuthContext = createContext()
const auth = getAuth(app);




const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);


    // creating user with email and password
    const createWithEmailPass = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };


    // sign in user with email and password
    const signInWithEmailPass = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    };

    // sign out
    const userSignOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    // Getting the current user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {

            const userEmail = currentUser?.email || user?.email
            const loggedUser = { email: userEmail }

            setUser(currentUser);
            console.log('Current User from Context:', currentUser);
            setLoading(false)

            // if user exist then issue a token
            if (currentUser) {
                
                axios.post('https://car-service-jwt-server.vercel.app/jwt', loggedUser, {withCredentials: true})
                    .then(result => {
                    console.log('token response:',result.data )
                })
            }

            // if user is null
            else {
                axios.post('https://car-service-jwt-server.vercel.app/logout', loggedUser, { withCredentials: true })
                    .then(response => {
                    console.log('log out context:', response.data)
                })
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [])


    const authInfo = {
        user,
        loading,
        setLoading,
        createWithEmailPass,
        signInWithEmailPass,
        userSignOut,
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
};