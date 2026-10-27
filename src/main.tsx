import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider, MutationCache } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App";
import "./index.css";

const queryClient = new QueryClient({ mutationCache: new MutationCache({ onSuccess: () => { void queryClient.invalidateQueries({ queryKey: ["paid-orders"] }); void queryClient.invalidateQueries({ queryKey: ["order-classification"] }); } }) });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
