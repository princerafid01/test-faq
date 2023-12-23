import { Banner, Layout, Page } from "@shopify/polaris";

const MissingApiKey = () => {
    return (
        <Page>
            <Layout>
                <Layout.Section>
                    <Banner title="Shopify key Missing" status="critical">
                        Shopify key is Missing from application.
                    </Banner>
                </Layout.Section>
            </Layout>
        </Page>
    );
}

export default MissingApiKey;
