import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomeContact, {loader as homeContactLoader} from "./components/queries/home";
import Contact, {loader as contactLoader} from "./components/queries/contact";
import CreateContact, {action as createContact} from "./components/commands/create";
import Error404 from "./components/errors/error";
import { action as destroyAction } from "./components/commands/destroy";
import EditContact,  {action as editAction, loader as editContactLoader} from "./components/commands/edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeContact/>,
    errorElement: <Error404 />,
    loader: homeContactLoader,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/create",
        element: <CreateContact />,
        loader: homeContactLoader,
        action:createContact
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: editContactLoader,
        action:editAction
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
    ]
  },
  

]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
