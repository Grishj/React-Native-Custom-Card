import React from 'react';
import { View, StyleSheet } from 'react-native';
import { defaultStyles } from '../styles/defaultStyles';
import ExpandableText from './ExpandableText';
/**
 * Get overlay position styles based on position prop
 */
const getOverlayPositionStyle = (position = 'top-right') => {
    switch (position) {
        case 'top-left':
            return { top: 0, left: 0 };
        case 'top-right':
            return { top: 0, right: 0 };
        case 'bottom-left':
            return { bottom: 0, left: 0 };
        case 'bottom-right':
            return { bottom: 0, right: 0 };
        case 'center':
            // Center requires special handling via alignItems/justifyContent in parent
            return { top: '50%', left: '50%' };
        default:
            return { top: 0, right: 0 };
    }
};
/**
 * CardBody component - flexible content area with optional left/right items
 *
 * @example
 * ```tsx
 * <CardBody
 *   description="Long description text here..."  // String format
 *   // OR object format with full config:
 *   description={{ text: "Long text...", maxLength: 100, expandText: "More" }}
 *   borderRadius={12}
 *   backgroundColor="#f0f0f0"
 *   overlayItems={[
 *     { content: <HeartIcon />, position: 'top-right' },
 *     { content: <Badge>-20%</Badge>, position: 'top-left' }
 *   ]}
 * >
 *   <Image source={...} />
 * </CardBody>
 * ```
 */
const CardBody = ({ children, description, maxDescriptionLength = 150, expandText, collapseText, descriptionPosition = 'bottom', leftItem, rightItem, borderRadius, backgroundColor, overlayItems, overlayOnChildrenOnly = false, style, descriptionStyle, onDescriptionToggle, }) => {
    // Handle description as string or DescriptionConfig object
    const descConfig = description
        ? typeof description === 'string'
            ? { text: description, maxLength: maxDescriptionLength, expandText, collapseText }
            : description
        : null;
    const descriptionElement = descConfig ? (React.createElement(ExpandableText, { text: descConfig.text, maxLength: descConfig.maxLength || maxDescriptionLength, expandText: descConfig.expandText || expandText, collapseText: descConfig.collapseText || collapseText, textStyle: descriptionStyle, onToggle: onDescriptionToggle, style: children ? { marginBottom: descriptionPosition === 'top' ? 12 : 0, marginTop: descriptionPosition === 'bottom' ? 12 : 0 } : undefined })) : null;
    // Build body styles with optional borderRadius and backgroundColor
    const bodyStyles = [
        defaultStyles.body,
        borderRadius !== undefined && { borderRadius },
        backgroundColor !== undefined && { backgroundColor },
        style,
    ];
    // Render overlay items helper
    const renderOverlayItems = () => overlayItems?.map((item, index) => (React.createElement(View, { key: index, style: [
            overlayStyles.overlay,
            getOverlayPositionStyle(item.position),
            item.offsetX !== undefined && { marginLeft: item.offsetX, marginRight: -item.offsetX },
            item.offsetY !== undefined && { marginTop: item.offsetY, marginBottom: -item.offsetY },
            item.style,
        ] }, item.content)));
    // Children with overlays (when overlayOnChildrenOnly is true)
    const childrenWithOverlays = overlayOnChildrenOnly && children ? (React.createElement(View, { style: { position: 'relative' } },
        children,
        renderOverlayItems())) : null;
    return (React.createElement(View, { style: bodyStyles },
        leftItem && React.createElement(View, null, leftItem),
        React.createElement(View, { style: [defaultStyles.bodyContent, !overlayOnChildrenOnly && { position: 'relative' }] },
            descriptionPosition === 'top' && descriptionElement,
            overlayOnChildrenOnly ? childrenWithOverlays : children,
            descriptionPosition === 'bottom' && descriptionElement,
            !overlayOnChildrenOnly && renderOverlayItems()),
        rightItem && React.createElement(View, null, rightItem)));
};
const overlayStyles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        zIndex: 10,
    },
});
export default CardBody;
//# sourceMappingURL=CardBody.js.map