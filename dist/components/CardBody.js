import React from 'react';
import { View } from 'react-native';
import { defaultStyles } from '../styles/defaultStyles';
import ExpandableText from './ExpandableText';
/**
 * CardBody component - flexible content area with optional left/right items
 *
 * @example
 * ```tsx
 * <CardBody
 *   description="Long description text here..."
 *   maxDescriptionLength={100}
 *   descriptionPosition="top"  // or "bottom" (default)
 *   leftItem={<Image source={...} />}
 *   rightItem={<Icon name="chevron-right" />}
 * >
 *   <Text>Card body content here</Text>
 * </CardBody>
 * ```
 */
const CardBody = ({ children, description, maxDescriptionLength = 150, expandText, collapseText, descriptionPosition = 'bottom', leftItem, rightItem, style, descriptionStyle, onDescriptionToggle, }) => {
    const descriptionElement = description ? (React.createElement(ExpandableText, { text: description, maxLength: maxDescriptionLength, expandText: expandText, collapseText: collapseText, textStyle: descriptionStyle, onToggle: onDescriptionToggle, style: children ? { marginBottom: descriptionPosition === 'top' ? 12 : 0, marginTop: descriptionPosition === 'bottom' ? 12 : 0 } : undefined })) : null;
    return (React.createElement(View, { style: [defaultStyles.body, style] },
        leftItem && React.createElement(View, null, leftItem),
        React.createElement(View, { style: defaultStyles.bodyContent },
            descriptionPosition === 'top' && descriptionElement,
            children,
            descriptionPosition === 'bottom' && descriptionElement),
        rightItem && React.createElement(View, null, rightItem)));
};
export default CardBody;
//# sourceMappingURL=CardBody.js.map