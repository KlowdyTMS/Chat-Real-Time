import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routers } from "./Routes/routes";
import { queryClient } from "./services/queryClient";
import { QueryClientProvider } from "react-query";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={routers} />
  </QueryClientProvider>
);
