import React from 'react';
import { View, Text } from 'react-native';
import { defaultStyles } from '../styles/defaultStyles';
import Divider from './Divider';
/**
 * CardHeader component with title, subtitle, and optional left/right items
 *
 * @example
 * ```tsx
 * <CardHeader
 *   title="Card Title"
 *   subtitle="Optional subtitle"
 *   leftItem={<Avatar />}
 *   showLeftDivider={true}  // Show divider after leftItem
 *   rightItem={<IconButton />}
 * />
 * ```
 */
const CardHeader = ({ title, subtitle, leftItem, showLeftDivider = false, leftDividerProps, rightItem, style, titleStyle, subtitleStyle, }) => {
    return (React.createElement(View, { style: [defaultStyles.header, style] },
        leftItem && React.createElement(View, null, leftItem),
        leftItem && showLeftDivider && (React.createElement(Divider, { orientation: "vertical", marginHorizontal: 10, color: "#E5E7EB", ...leftDividerProps })),
        React.createElement(View, { style: defaultStyles.headerContent },
            React.createElement(Text, { style: [defaultStyles.headerTitle, titleStyle] }, title),
            subtitle && (React.createElement(Text, { style: [defaultStyles.headerSubtitle, subtitleStyle] }, subtitle))),
        rightItem && React.createElement(View, null, rightItem)));
};
export default CardHeader;
//# sourceMappingURL=CardHeader.js.map