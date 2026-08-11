import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import {
    getCurrentUser,
    logout as logoutApi,
} from "@/api/auth";

import type { LoginResponse } from "@/types/auth";

interface AuthContextValue {
    user: LoginResponse | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    refreshUser: () => Promise<LoginResponse | null>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(
    undefined,
);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({
    children,
}: AuthProviderProps) {
    const [user, setUser] =
        useState<LoginResponse | null>(null);

    const [isLoading, setIsLoading] =
        useState(true);

    const refreshUser =
        async (): Promise<LoginResponse | null> => {
            try {
                const currentUser =
                    await getCurrentUser();

                setUser(currentUser);

                return currentUser;
            } catch {
                setUser(null);

                return null;
            }
        };

    useEffect(() => {
        let mounted = true;

        const bootstrap =
            async () => {
                try {
                    const currentUser =
                        await getCurrentUser();

                    if (mounted) {
                        setUser(currentUser);
                    }
                } catch {
                    if (mounted) {
                        setUser(null);
                    }
                } finally {
                    if (mounted) {
                        setIsLoading(false);
                    }
                }
            };

        void bootstrap();

        return () => {
            mounted = false;
        };
    }, []);

    const logout =
        async (): Promise<void> => {
            try {
                await logoutApi();
            } finally {
                setUser(null);
            }
        };

    const value =
        useMemo<AuthContextValue>(
            () => ({
                user,
                isLoading,
                isAuthenticated:
                    user !== null,
                refreshUser,
                logout,
            }),
            [
                user,
                isLoading,
            ],
        );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used within an AuthProvider.",
        );
    }

    return context;
}