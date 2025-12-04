import React from 'react';
import { View } from 'react-native';
import { defaultStyles } from '../styles/defaultStyles';
/**
 * CardFooter component for actions, buttons, or additional information
 *
 * @example
 * ```tsx
 * <CardFooter
 *   leftItem={<Text>Posted 2h ago</Text>}
 *   rightItem={<Button title="View More" />}
 * >
 *   <View style={{ flexDirection: 'row' }}>
 *     <Button title="Like" />
 *     <Button title="Share" />
 *   </View>
 * </CardFooter>
 * ```
 */
const CardFooter = ({ children, leftItem, rightItem, style, }) => {
    return (React.createElement(View, { style: [defaultStyles.footer, style] },
        leftItem && React.createElement(View, null, leftItem),
        React.createElement(View, { style: defaultStyles.footerContent }, children),
        rightItem && React.createElement(View, null, rightItem)));
};
export default CardFooter;
//# sourceMappingURL=CardFooter.js.map