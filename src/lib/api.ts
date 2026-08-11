import axios from "axios";

const baseURL =
    import.meta.env.VITE_API_BASE_URL ?? "/api";

export const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,

    (error) => {
        if (
            error.response?.status === 401
        ) {
            const requestUrl =
                error.config?.url ?? "";

            /*
             * Authentication endpoints are handled
             * by the auth layer itself.
             *
             * In particular, an invalid login must
             * remain visible on LoginPage instead of
             * causing an immediate redirect loop.
             */
            const isAuthRequest =
                requestUrl.startsWith("/auth/login") ||
                requestUrl.startsWith("/auth/me") ||
                requestUrl.startsWith("/auth/logout");

            if (!isAuthRequest) {
                const currentPath =
                    window.location.pathname;

                if (
                    currentPath !== "/login"
                ) {
                    window.location.assign(
                        "/login",
                    );
                }
            }
        }

        return Promise.reject(error);
    },
);