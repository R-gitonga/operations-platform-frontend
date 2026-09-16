import { type FormEvent, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { resetPassword } from "@/api/auth";
import { getApiErrorMessage } from "@/lib/apiError";
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

export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") ?? "";
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);

        if (!token) {
            setError("This password reset link is invalid or incomplete.");
            return;
        }

        if (password.length < 4) {
            setError("Password must be at least 4 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsSubmitting(true);

        try {
            await resetPassword({ token, password });
            setIsComplete(true);
        } catch (error) {
            setError(getApiErrorMessage(error));
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Set a new password</CardTitle>
                    <CardDescription>
                        Your new password only needs to be at least 4 characters long.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isComplete ? (
                        <div className="space-y-4 text-sm text-slate-700">
                            <p>Your password has been reset. You can now sign in.</p>
                            <Link className="text-blue-600 hover:underline" to="/login">
                                Go to sign in
                            </Link>
                        </div>
                    ) : (
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="password">New password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    autoComplete="new-password"
                                    minLength={4}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm new password</Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    autoComplete="new-password"
                                    minLength={4}
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    required
                                />
                            </div>

                            {error && (
                                <p className="text-sm text-destructive" role="alert">
                                    {error}
                                </p>
                            )}

                            <Button className="w-full" type="submit" disabled={isSubmitting || !token}>
                                {isSubmitting ? "Resetting..." : "Reset password"}
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </main>
    );
}
