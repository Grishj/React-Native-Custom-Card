import React from 'react';
import { View, Text } from 'react-native';
import { defaultStyles } from '../styles/defaultStyles';
/**
 * CardHeader component with title, subtitle, and optional left/right items
 *
 * @example
 * ```tsx
 * <CardHeader
 *   title="Card Title"
 *   subtitle="Optional subtitle"
 *   leftItem={<Avatar />}
 *   rightItem={<IconButton />}
 * />
 * ```
 */
const CardHeader = ({ title, subtitle, leftItem, rightItem, style, titleStyle, subtitleStyle, }) => {
    return (React.createElement(View, { style: [defaultStyles.header, style] },
        leftItem && React.createElement(View, null, leftItem),
        React.createElement(View, { style: defaultStyles.headerContent },
            React.createElement(Text, { style: [defaultStyles.headerTitle, titleStyle] }, title),
            subtitle && (React.createElement(Text, { style: [defaultStyles.headerSubtitle, subtitleStyle] }, subtitle))),
        rightItem && React.createElement(View, null, rightItem)));
};
export default CardHeader;
//# sourceMappingURL=CardHeader.js.map