import { BrowserRouter } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";

import AppRoutes from "@/routes";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster richColors position="top-right" />
    </BrowserRouter>
  );
}

export default App;
