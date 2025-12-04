import React from 'react';
import { View, Text } from 'react-native';
import { CardHeaderProps } from '../types';
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
const CardHeader: React.FC<CardHeaderProps> = ({
    title,
    subtitle,
    leftItem,
    showLeftDivider = false,
    leftDividerProps,
    rightItem,
    style,
    titleStyle,
    subtitleStyle,
}) => {
    return (
        <View style={[defaultStyles.header, style]}>
            {leftItem && <View>{leftItem}</View>}

            {/* Vertical divider between leftItem and title */}
            {leftItem && showLeftDivider && (
                <Divider
                    orientation="vertical"
                    marginHorizontal={10}
                    color="#E5E7EB"
                    {...leftDividerProps}
                />
            )}

            <View style={defaultStyles.headerContent}>
                <Text style={[defaultStyles.headerTitle, titleStyle]}>
                    {title}
                </Text>
                {subtitle && (
                    <Text style={[defaultStyles.headerSubtitle, subtitleStyle]}>
                        {subtitle}
                    </Text>
                )}
            </View>

            {rightItem && <View>{rightItem}</View>}
        </View>
    );
};

export default CardHeader;

