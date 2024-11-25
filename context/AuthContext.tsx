import React, { createContext, useState, useEffect, PropsWithChildren } from 'react';
import { signInWithEmailAndPassword, signOut, updateEmail, updatePassword, User, UserCredential } from 'firebase/auth';
import { auth } from '../services/firebase';
import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    isLoading: boolean;

    userEmail: string | null;
    userPassword: string | null;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    const [session, setSession] = useState(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userPassword, setUserPassword] = useState<string | null>(null);

    useEffect(() => {
        const loadSession = async () => {
            const session = await SecureStore.getItemAsync('session');
            if (session) {
                const parsedUser = JSON.parse(session);
                setUser(parsedUser);
            }
            setIsLoading(false);
        };

        loadSession();
    }, []);


    // sign in
    const login = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);

            await SecureStore.setItemAsync('session', JSON.stringify(userCredential.user));
            return userCredential;
        } catch (error) {
            console.error("Error signing in: ", error);
            throw error;
        }
    };

    // sign out
    const logout = () => {
        return signOut(auth);
        setUser(null);
        SecureStore.deleteItemAsync('session');
    };


    const setEmail = async (email: string) => {
        if (!user) {
            throw new Error("No current admin");
        }

        return updateEmail(user, email);
    };

    const setPassword = async (password: string) => {
        if (!user) {
            throw new Error("No current admin");
        }

        return updatePassword(user, password);
    };


    return (
        <AuthContext.Provider value={{ user, isLoading, userEmail, userPassword, setEmail, setPassword, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider;
