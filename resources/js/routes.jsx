import AddGroup from "./Pages/AddGroup";
import EditGroup from "./Pages/EditGroup";
import Home from "./Pages/Home";

const routes = {
    "/": () => <Home />,
    "/add-group": () => <AddGroup />,
    "/group-edit/:id": ({ id }) => <EditGroup id={id} />
};

export default routes;
