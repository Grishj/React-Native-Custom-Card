import React from 'react';
import { View, Text } from 'react-native';
import { CardHeaderProps } from '../types';
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
const CardHeader: React.FC<CardHeaderProps> = ({
    title,
    subtitle,
    leftItem,
    rightItem,
    style,
    titleStyle,
    subtitleStyle,
}) => {
    return (
        <View style={[defaultStyles.header, style]}>
            {leftItem && <View>{leftItem}</View>}

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
