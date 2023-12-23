import AddGroup from "./Pages/AddGroup";
import Home from "./Pages/Home";

const routes = {
    "/": () => <Home />,
    "/add-group": () => <AddGroup />
};

export default routes;
