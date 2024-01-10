import { Popover, ActionList, Icon } from "@shopify/polaris";
import {
    ArchiveMinor,
    DeleteMajor,
    DuplicateMinor,
    EditMajor,
    HideMinor,
    HorizontalDotsMinor,
} from "@shopify/polaris-icons";
import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";

const DotsWithActionMenu = ({ actionMenus, isActive }) => {
    const [active, setActive] = useState(false);

    const toggleActive = useCallback(() => setActive((active) => !active), []);

    useEffect(() => {
        setActive(isActive);
    }, [isActive]);

    const activator = (
        <div onClick={toggleActive} style={{ opacity: "1!important" }}>
            <Icon source={HorizontalDotsMinor} tone="base" />
        </div>
    );

    return (
        <div>
            <Popover
                active={active}
                activator={activator}
                autofocusTarget="first-node"
                onClose={toggleActive}
            >
                <ActionList actionRole="menuitem" items={actionMenus} />
            </Popover>
        </div>
    );
};

DotsWithActionMenu.propTypes = {
    actionMenus: PropTypes.array.isRequired,
    isActive: PropTypes.bool,
};

export default DotsWithActionMenu;
