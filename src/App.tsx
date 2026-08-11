import { BrowserRouter } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./auth/AuthProvider";

import AppRoutes from "@/routes";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>

            <Toaster
                richColors
                position="top-right"
            />
        </BrowserRouter>
    );
}

export default App;