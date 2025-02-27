import React, { createContext, useState, useEffect, PropsWithChildren } from 'react';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    User,
    UserCredential
} from 'firebase/auth';
import { auth } from '../services/firebase';
import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
    currentUser: User | null;
    signup: (email: string, password: string) => Promise<UserCredential>;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    isLoading: boolean;
    resetPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const loadSession = async () => {
            const session = await SecureStore.getItemAsync('session');
            if (session) {
                setCurrentUser(JSON.parse(session));
            }
            setIsLoading(false);
        };
        loadSession();
    }, []);

    const signup = async (email: string, password: string) => {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        setCurrentUser(userCredentials.user);
        await SecureStore.setItemAsync('session', JSON.stringify(userCredentials.user));
        return userCredentials;
    };

    const login = async (email: string, password: string) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setCurrentUser(userCredential.user);
        await SecureStore.setItemAsync('session', JSON.stringify(userCredential.user));
        return userCredential;
    };

    const logout = async () => {
        await signOut(auth);
        setCurrentUser(null);
        SecureStore.deleteItemAsync('session');
    };

    const resetPassword = (email: string) => {
        return sendPasswordResetEmail(auth, email);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,
            (user) => {
                setCurrentUser(user);
            });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{
            currentUser,
            isLoading,
            signup,
            login,
            logout,
            resetPassword,
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider;
