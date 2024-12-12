import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageMain from "./Pages/PageMain/PageMain.tsx";
import PageFloatAdd from "./Pages/PageFloatAdd/PageFloatAdd.tsx";
import PageResidence from "./Pages/PageResidence/PageResidence.tsx";
import PageApartments from "./Pages/PageApartments/PageApartments.tsx";
import PageResidenceAdd from "./Pages/PageResidenceAdd/PageResidenceAdd.tsx";
import './Models/index.ts';
import "./index.css";
import PageContacts from "./Pages/PageContacts/PageContacts.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageMain />,
  },
  {
    path: "/page_flat_add",
    element: <PageFloatAdd />,
  },
  {
    path: "/residence_add",
    element: <PageResidenceAdd />,
  },
  {
    path: "/residence/:id",
    element: <PageResidence />,
  },
  {
    path: "/apartments",
    element: <PageApartments />,
  },
  {
    path: "/contacts",
    element: <PageContacts />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
