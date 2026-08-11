import { useState, type FormEvent } from "react";

import {
    useCreateUser,
    useUsers,
    useDeactivateUser,
    useUpdateUser,
} from "@/hooks/useUsers";

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

type UserRole = "admin" | "user";

export default function UserManagementPage() {
    const {
        data: users,
        isLoading,
        error: usersError,
    } = useUsers();

    const createUser = useCreateUser();
    const updateUser = useUpdateUser();
    const deactivateUserMutation = useDeactivateUser();

    // -----------------------------------------
    // Create user state
    // -----------------------------------------

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<UserRole>("user");

    const [createError, setCreateError] =
        useState<string | null>(null);

    // -----------------------------------------
    // Edit user state
    // -----------------------------------------

    const [editingUserId, setEditingUserId] =
        useState<number | null>(null);

    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editRole, setEditRole] =
        useState<UserRole>("user");
    const [editActive, setEditActive] =
        useState(true);

    const [updateError, setUpdateError] =
        useState<string | null>(null);

    // -----------------------------------------
    // Create user
    // -----------------------------------------

    const handleCreateUser = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        setCreateError(null);

        try {
            await createUser.mutateAsync({
                name,
                email,
                password,
                role,
            });

            setName("");
            setEmail("");
            setPassword("");
            setRole("user");
        } catch (error) {
            setCreateError(
                getApiErrorMessage(error),
            );
        }
    };

    // -----------------------------------------
    // Begin editing a user
    // -----------------------------------------

    const handleStartEdit = (
        id: number,
        userName: string,
        userEmail: string,
        userRole: string,
        active: boolean,
    ) => {
        setEditingUserId(id);

        setEditName(userName);
        setEditEmail(userEmail);

        setEditRole(
            userRole === "admin"
                ? "admin"
                : "user",
        );

        setEditActive(active);

        setUpdateError(null);
    };

    // -----------------------------------------
    // Cancel editing
    // -----------------------------------------

    const handleCancelEdit = () => {
        setEditingUserId(null);

        setEditName("");
        setEditEmail("");
        setEditRole("user");
        setEditActive(true);

        setUpdateError(null);
    };

    // -----------------------------------------
    // Update user
    // -----------------------------------------

    const handleUpdateUser = async (
        event: FormEvent<HTMLFormElement>,
        id: number,
    ) => {
        event.preventDefault();

        setUpdateError(null);

        try {
            await updateUser.mutateAsync({
                id,
                payload: {
                    name: editName,
                    email: editEmail,
                    role: editRole,
                    active: editActive,
                },
            });

            handleCancelEdit();
        } catch (error) {
            setUpdateError(
                getApiErrorMessage(error),
            );
        }
    };

    // -----------------------------------------
    // Deactivate user
    // -----------------------------------------

    const handleDeactivate = (
        id: number,
        userName: string,
    ) => {
        const confirmed = window.confirm(
            `Are you sure you want to deactivate ${userName}?`,
        );

        if (!confirmed) {
            return;
        }

        deactivateUserMutation.mutate(id);
    };

    return (
        <div className="space-y-8">
            {/* ----------------------------------------- */}
            {/* Page heading */}
            {/* ----------------------------------------- */}

            <div>
                <h1 className="text-3xl font-bold">
                    User Management
                </h1>

                <p className="text-slate-500">
                    Create and manage user accounts for the system.
                </p>
            </div>

            {/* ----------------------------------------- */}
            {/* Create user */}
            {/* ----------------------------------------- */}

            <Card>
                <CardHeader>
                    <CardTitle>
                        Create User
                    </CardTitle>

                    <CardDescription>
                        Create a new account and assign its access role.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleCreateUser}
                        className="space-y-5"
                    >
                        <div className="grid gap-5 md:grid-cols-2">
                            {/* Name */}

                            <div className="space-y-2">
                                <Label htmlFor="user-name">
                                    Name
                                </Label>

                                <Input
                                    id="user-name"
                                    value={name}
                                    onChange={(event) =>
                                        setName(
                                            event.target.value,
                                        )
                                    }
                                    required
                                />
                            </div>

                            {/* Email */}

                            <div className="space-y-2">
                                <Label htmlFor="user-email">
                                    Email
                                </Label>

                                <Input
                                    id="user-email"
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

                            {/* Password */}

                            <div className="space-y-2">
                                <Label htmlFor="user-password">
                                    Temporary Password
                                </Label>

                                <Input
                                    id="user-password"
                                    type="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(
                                            event.target.value,
                                        )
                                    }
                                    minLength={8}
                                    required
                                />
                            </div>

                            {/* Role */}

                            <div className="space-y-2">
                                <Label htmlFor="user-role">
                                    Role
                                </Label>

                                <select
                                    id="user-role"
                                    value={role}
                                    onChange={(event) =>
                                        setRole(
                                            event.target
                                                .value as UserRole,
                                        )
                                    }
                                    className="flex h-10 w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm"
                                >
                                    <option value="user">
                                        User
                                    </option>

                                    <option value="admin">
                                        Admin
                                    </option>
                                </select>
                            </div>
                        </div>

                        {createError && (
                            <p
                                className="text-sm text-destructive"
                                role="alert"
                            >
                                {createError}
                            </p>
                        )}

                        <Button
                            type="submit"
                            disabled={createUser.isPending}
                        >
                            {createUser.isPending
                                ? "Creating..."
                                : "Create User"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* ----------------------------------------- */}
            {/* Users */}
            {/* ----------------------------------------- */}

            <Card>
                <CardHeader>
                    <CardTitle>
                        Users
                    </CardTitle>

                    <CardDescription>
                        Accounts currently registered in the system.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {isLoading && (
                        <p className="text-sm text-slate-500">
                            Loading users...
                        </p>
                    )}

                    {usersError && (
                        <p
                            className="text-sm text-destructive"
                            role="alert"
                        >
                            {getApiErrorMessage(
                                usersError,
                            )}
                        </p>
                    )}

                    {!isLoading &&
                        !usersError &&
                        users &&
                        users.length === 0 && (
                            <p className="text-sm text-slate-500">
                                No users found.
                            </p>
                        )}

                    {!isLoading &&
                        !usersError &&
                        users &&
                        users.length > 0 && (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b text-left">
                                            <th className="px-3 py-3 font-medium">
                                                Name
                                            </th>

                                            <th className="px-3 py-3 font-medium">
                                                Email
                                            </th>

                                            <th className="px-3 py-3 font-medium">
                                                Role
                                            </th>

                                            <th className="px-3 py-3 font-medium">
                                                Status
                                            </th>

                                            <th className="px-3 py-3 font-medium">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {users.map((user) => {
                                            const isEditing =
                                                editingUserId ===
                                                user.id;

                                            return (
                                                <tr
                                                    key={user.id}
                                                    className="border-b last:border-0"
                                                >
                                                    {isEditing ? (
                                                        <>
                                                            {/* Edit name */}

                                                            <td className="px-3 py-3">
                                                                <Input
                                                                    value={
                                                                        editName
                                                                    }
                                                                    onChange={(
                                                                        event,
                                                                    ) =>
                                                                        setEditName(
                                                                            event
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                />
                                                            </td>

                                                            {/* Edit email */}

                                                            <td className="px-3 py-3">
                                                                <Input
                                                                    type="email"
                                                                    value={
                                                                        editEmail
                                                                    }
                                                                    onChange={(
                                                                        event,
                                                                    ) =>
                                                                        setEditEmail(
                                                                            event
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                />
                                                            </td>

                                                            {/* Edit role */}

                                                            <td className="px-3 py-3">
                                                                <select
                                                                    value={
                                                                        editRole
                                                                    }
                                                                    onChange={(
                                                                        event,
                                                                    ) =>
                                                                        setEditRole(
                                                                            event
                                                                                .target
                                                                                .value as UserRole,
                                                                        )
                                                                    }
                                                                    className="h-10 w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm"
                                                                >
                                                                    <option value="user">
                                                                        User
                                                                    </option>

                                                                    <option value="admin">
                                                                        Admin
                                                                    </option>
                                                                </select>
                                                            </td>

                                                            {/* Edit status */}

                                                            <td className="px-3 py-3">
                                                                <select
                                                                    value={
                                                                        editActive
                                                                            ? "active"
                                                                            : "inactive"
                                                                    }
                                                                    onChange={(
                                                                        event,
                                                                    ) =>
                                                                        setEditActive(
                                                                            event
                                                                                .target
                                                                                .value ===
                                                                                "active",
                                                                        )
                                                                    }
                                                                    className="h-10 w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm"
                                                                >
                                                                    <option value="active">
                                                                        Active
                                                                    </option>

                                                                    <option value="inactive">
                                                                        Inactive
                                                                    </option>
                                                                </select>
                                                            </td>

                                                            {/* Edit actions */}

                                                            <td className="px-3 py-3">
                                                                <form
                                                                    onSubmit={(
                                                                        event,
                                                                    ) =>
                                                                        handleUpdateUser(
                                                                            event,
                                                                            user.id,
                                                                        )
                                                                    }
                                                                    className="flex flex-wrap gap-2"
                                                                >
                                                                    <Button
                                                                        type="submit"
                                                                        size="sm"
                                                                        disabled={
                                                                            updateUser.isPending
                                                                        }
                                                                    >
                                                                        {updateUser.isPending
                                                                            ? "Saving..."
                                                                            : "Save"}
                                                                    </Button>

                                                                    <Button
                                                                        type="button"
                                                                        size="sm"
                                                                        variant="outline"
                                                                        onClick={
                                                                            handleCancelEdit
                                                                        }
                                                                        disabled={
                                                                            updateUser.isPending
                                                                        }
                                                                    >
                                                                        Cancel
                                                                    </Button>
                                                                </form>

                                                                {updateError &&
                                                                    editingUserId ===
                                                                        user.id && (
                                                                        <p
                                                                            className="mt-2 text-xs text-destructive"
                                                                            role="alert"
                                                                        >
                                                                            {
                                                                                updateError
                                                                            }
                                                                        </p>
                                                                    )}
                                                            </td>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {/* Name */}

                                                            <td className="px-3 py-3">
                                                                {
                                                                    user.name
                                                                }
                                                            </td>

                                                            {/* Email */}

                                                            <td className="px-3 py-3">
                                                                {
                                                                    user.email
                                                                }
                                                            </td>

                                                            {/* Role */}

                                                            <td className="px-3 py-3 capitalize">
                                                                {
                                                                    user.role
                                                                }
                                                            </td>

                                                            {/* Status */}

                                                            <td className="px-3 py-3">
                                                                {user.active
                                                                    ? "Active"
                                                                    : "Inactive"}
                                                            </td>

                                                            {/* Actions */}

                                                            <td className="px-3 py-3">
                                                                <div className="flex flex-wrap gap-2">
                                                                    <Button
                                                                        type="button"
                                                                        size="sm"
                                                                        variant="outline"
                                                                        onClick={() =>
                                                                            handleStartEdit(
                                                                                user.id,
                                                                                user.name,
                                                                                user.email,
                                                                                user.role,
                                                                                user.active,
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            editingUserId !==
                                                                                null ||
                                                                            updateUser.isPending ||
                                                                            deactivateUserMutation.isPending
                                                                        }
                                                                    >
                                                                        Edit
                                                                    </Button>

                                                                    {user.active && (
                                                                        <Button
                                                                            type="button"
                                                                            size="sm"
                                                                            variant="destructive"
                                                                            onClick={() =>
                                                                                handleDeactivate(
                                                                                    user.id,
                                                                                    user.name,
                                                                                )
                                                                            }
                                                                            disabled={
                                                                                deactivateUserMutation.isPending ||
                                                                                updateUser.isPending
                                                                            }
                                                                        >
                                                                            {deactivateUserMutation.isPending
                                                                                ? "Deactivating..."
                                                                                : "Deactivate"}
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                </CardContent>
            </Card>
        </div>
    );
}