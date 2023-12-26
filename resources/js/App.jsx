import { useRoutes } from "raviger";
import routes from "./routes";

const App = () => {
    const AppRoutes = useRoutes(routes);

    return <>{AppRoutes}</>;
};

export default App;
