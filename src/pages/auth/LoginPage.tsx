import { type FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { login } from "@/api/auth";
import { useAuth } from "@/auth/AuthProvider";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { getApiErrorMessage } from "@/lib/apiError";

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        isAuthenticated,
        refreshUser,
    } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] =
        useState<string | null>(null);

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const from =
        location.state?.from?.pathname ?? "/";

    if (isAuthenticated) {
        navigate("/", { replace: true });

        return null;
    }

    const handleSubmit =
        async (
            event: FormEvent<HTMLFormElement>,
        ) => {
            event.preventDefault();

            setError(null);
            setIsSubmitting(true);

            try {
                await login({
                    email,
                    password,
                });

                const currentUser =
                    await refreshUser();

                if (!currentUser) {
                    setError(
                        "Login succeeded, but the authenticated session could not be established.",
                    );

                    return;
                }

                navigate(from, {
                    replace: true,
                });
            } catch (error) {
                setError(
                    getApiErrorMessage(error),
                );
            } finally {
                setIsSubmitting(false);
            }
        };

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>
                        Sign in
                    </CardTitle>

                    <CardDescription>
                        Sign in to manage workshop
                        orders and production
                        activity.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        className="space-y-5"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-2">
                            <Label htmlFor="email">
                                Email address
                            </Label>

                            <Input
                                id="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(
                                        event.target.value,
                                    )
                                }
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">
                                Password
                            </Label>

                            <Input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value,
                                    )
                                }
                                required
                            />
                        </div>

                        {error && (
                            <p
                                className="text-sm text-destructive"
                                role="alert"
                            >
                                {error}
                            </p>
                        )}

                        <Button
                            className="w-full"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? "Signing in..."
                                : "Sign in"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}