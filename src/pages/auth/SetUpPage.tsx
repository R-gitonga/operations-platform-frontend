import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { bootstrapAdmin } from "@/api/auth";

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

export default function SetupPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError(null);
        setSuccess(null);
        setIsSubmitting(true);

        try {
            const result = await bootstrapAdmin({ name, email, password });

            setSuccess(result.message);

            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 1500);
        } catch (error) {
            setError(getApiErrorMessage(error));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Create the first admin account</CardTitle>

                    <CardDescription>
                        This only works on a database with no accounts yet.
                        Once any account exists, this page stops working —
                        from then on, new accounts are created from User
                        Management by an existing admin.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                autoComplete="name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                        </div>

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

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>

                            <Input
                                id="password"
                                type="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-destructive" role="alert">
                                {error}
                            </p>
                        )}

                        {success && (
                            <p className="text-sm text-emerald-600" role="status">
                                {success} Redirecting to sign in...
                            </p>
                        )}

                        <Button className="w-full" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create admin account"}
                        </Button>
                    </form>

                    <Link
                        to="/login"
                        className="mt-4 block text-center text-sm text-blue-600 hover:underline"
                    >
                        Already have an account? Sign in
                    </Link>
                </CardContent>
            </Card>
        </main>
    );
}