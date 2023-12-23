import { Button, FormLayout, Layout, Page, RangeSlider } from "@shopify/polaris";
import useAxios from "./hooks/useAxios.js";
import {useState, useEffect, useCallback} from "react";


const App = () => {
    const {axios} = useAxios();

    // Dummy API Call
    // const createFakeProducts = useCallback( async() => {
    //     const {data} = await axios.post("/products", options);
    //     console.log("Axios Says: ", data.msg);
    // }, [options]);

    useEffect(() => {
        console.log("from App");
    }, [])

    return (
            <Page title="Home">
                <Layout>
                    <Layout.Section>
                        <FormLayout>
                            <h1>Hello Dihan</h1>
                        </FormLayout>
                    </Layout.Section>
                </Layout>
            </Page>
    );
}

export default App;
