import {
    IndexTable,
    LegacyCard,
    useIndexResourceState,
    Text,
    Badge,
    useBreakpoints,
    Button,
} from "@shopify/polaris";
import {
    EditMajor, ViewMajor
  } from '@shopify/polaris-icons';

const GroupList = () => {
    const groups = [
        {
            id: "1020",
            order: "#1020",
            date: "Jul 20 at 4:34pm",
            customer: "Jaydon Stanton",
            total: "$969.44",
            paymentStatus: <Badge progress="complete">Paid</Badge>,
            fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
        },
    ];
    const resourceName = {
        singular: "group",
        plural: "groups",
    };

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(groups);

    const rowMarkup = groups.map(({ id, order, date, customer }, index) => (
        <IndexTable.Row
            id={id}
            key={id}
            selected={selectedResources.includes(id)}
            position={index}
        >
            <IndexTable.Cell>
                <Text variant="bodyMd" fontWeight="bold" as="span">
                    {order}
                </Text>
            </IndexTable.Cell>
            <IndexTable.Cell>{date}</IndexTable.Cell>
            <IndexTable.Cell>{customer}</IndexTable.Cell>
            <IndexTable.Cell>
                <Button icon={EditMajor}>
                    Edit
                </Button>
                <Button icon={ViewMajor}>
                    View Faqs
                </Button>
            </IndexTable.Cell>
        </IndexTable.Row>
    ));

    return (
        <LegacyCard>
            <IndexTable
                condensed={useBreakpoints().smDown}
                resourceName={resourceName}
                itemCount={groups.length}
                selectedItemsCount={
                    allResourcesSelected ? "All" : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                headings={[
                    { title: "Name" },
                    { title: "Description" },
                    { title: "Status" },
                    { title: "Action",  alignment: 'middle' },
                ]}
            >
                {rowMarkup}
            </IndexTable>
        </LegacyCard>
    );
};

export default GroupList;
