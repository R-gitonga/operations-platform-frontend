import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import { requestPasswordReset } from "@/api/auth";
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

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            await requestPasswordReset({ email });
            setSubmitted(true);
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
                    <CardTitle>Forgot password?</CardTitle>
                    <CardDescription>
                        Enter your work email address and we will send a reset link.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {submitted ? (
                        <div className="space-y-4 text-sm text-slate-700">
                            <p>
                                If an active account uses that email address, a password reset link has been sent.
                            </p>
                            <Link className="text-blue-600 hover:underline" to="/login">
                                Return to sign in
                            </Link>
                        </div>
                    ) : (
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                            </div>

                            {error && (
                                <p className="text-sm text-destructive" role="alert">
                                    {error}
                                </p>
                            )}

                            <Button className="w-full" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Sending..." : "Send reset link"}
                            </Button>

                            <Link className="block text-center text-sm text-blue-600 hover:underline" to="/login">
                                Return to sign in
                            </Link>
                        </form>
                    )}
                </CardContent>
            </Card>
        </main>
    );
}
