import React from 'react';
import { View } from 'react-native';
import { CardBodyProps } from '../types';
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
const CardBody: React.FC<CardBodyProps> = ({
    children,
    description,
    maxDescriptionLength = 150,
    expandText,
    collapseText,
    descriptionPosition = 'bottom',
    leftItem,
    rightItem,
    style,
    descriptionStyle,
    onDescriptionToggle,
}) => {
    const descriptionElement = description ? (
        <ExpandableText
            text={description}
            maxLength={maxDescriptionLength}
            expandText={expandText}
            collapseText={collapseText}
            textStyle={descriptionStyle}
            onToggle={onDescriptionToggle}
            style={children ? { marginBottom: descriptionPosition === 'top' ? 12 : 0, marginTop: descriptionPosition === 'bottom' ? 12 : 0 } : undefined}
        />
    ) : null;

    return (
        <View style={[defaultStyles.body, style]}>
            {leftItem && <View>{leftItem}</View>}

            <View style={defaultStyles.bodyContent}>
                {/* Description at top if specified */}
                {descriptionPosition === 'top' && descriptionElement}

                {/* Render children content */}
                {children}

                {/* Description at bottom (default) */}
                {descriptionPosition === 'bottom' && descriptionElement}
            </View>

            {rightItem && <View>{rightItem}</View>}
        </View>
    );
};

export default CardBody;


