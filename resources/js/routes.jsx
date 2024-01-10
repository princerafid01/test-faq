import AddGroup from "./Pages/AddGroup";
import EditFaq from "./Pages/EditFaq";
import EditGroup from "./Pages/EditGroup";
import Home from "./Pages/Home";

const routes = {
    "/": () => <Home />,
    "/add-group": () => <AddGroup />,
    "/group-edit/:id": ({ id }) => <EditGroup id={id} />,
    "/group-edit/:id/question/:faqid": ({ id, faqid }) => (
        <EditFaq id={id} faqid={faqid} />
    ),
};

export default routes;
