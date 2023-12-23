// import useAxios from "./hooks/useAxios.js";
import { useRoutes } from "raviger";
import routes from "./routes";

const App = () => {
    const AppRoutes = useRoutes(routes)

    // Dummy API Call
    // const { axios } = useAxios();
    // const createFakeProducts = useCallback( async() => {
    //     const {data} = await axios.post("/products", options);
    //     console.log("Axios Says: ", data.msg);
    // }, [options]);

    return (
        <>{AppRoutes}</>
    );
};

export default App;
