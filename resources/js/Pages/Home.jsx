import { Page, Layout, FormLayout } from "@shopify/polaris";
import GroupList from "../components/Group/List";
import { navigate } from "raviger";

const Home = () => {
    // const {navigate} = useNavigate

    return (
        <Page
            title="Faq Groups"
            primaryAction={{
                content: "Add Group",
                onAction: () => navigate("/add-group"),
            }}
        >
            <Layout>
                <Layout.Section>
                    <FormLayout>
                        <GroupList />
                    </FormLayout>
                </Layout.Section>
            </Layout>
        </Page>
    );
};

export default Home;
