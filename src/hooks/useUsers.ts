import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    createUser,
    deactivateUser,
    getUser,
    getUsers,
    updateUser,
} from "@/api/users";

import type {
    CreateUserRequest,
    UpdateUserRequest,
} from "@/types/user";

export function useUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });
}

export function useUser(id: number) {
    return useQuery({
        queryKey: ["users", id],
        queryFn: () => getUser(id),
        enabled: id > 0,
    });
}

export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateUserRequest) =>
            createUser(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });
}

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: number;
            payload: UpdateUserRequest;
        }) =>
            updateUser(id, payload),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });

            queryClient.invalidateQueries({
                queryKey: ["users", variables.id],
            });
        },
    });
}

export function useDeactivateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) =>
            deactivateUser(id),

        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });

            queryClient.invalidateQueries({
                queryKey: ["users", id],
            });
        },
    });
}