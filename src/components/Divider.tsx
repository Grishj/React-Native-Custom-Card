import React from 'react';
import { View, StyleSheet, ViewStyle, DimensionValue } from 'react-native';
import { DividerProps } from '../types';
import { colors, spacing } from '../styles/defaultStyles';

/**
 * Divider component for separating card sections
 * Supports both horizontal and vertical orientations
 * 
 * @example
 * ```tsx
 * // Horizontal divider (default)
 * <Divider color="#E5E7EB" thickness={1} />
 * 
 * // Vertical divider
 * <Divider orientation="vertical" thickness={1} length={50} />
 * ```
 */
const Divider: React.FC<DividerProps> = ({
    orientation = 'horizontal',
    color = colors.divider,
    thickness = 1,
    length,
    marginHorizontal = 0,
    marginVertical = spacing.md,
    style,
}) => {
    const isVertical = orientation === 'vertical';

    const dividerStyle: ViewStyle = isVertical
        ? {
            width: thickness,
            height: (length || '100%') as DimensionValue,
            backgroundColor: color,
            marginHorizontal: marginHorizontal || spacing.md,
            marginVertical: 0,
        }
        : {
            height: thickness,
            width: (length || '100%') as DimensionValue,
            backgroundColor: color,
            marginHorizontal,
            marginVertical,
        };

    return (
        <View
            style={[
                isVertical ? styles.vertical : styles.horizontal,
                dividerStyle,
                style,
            ]}
        />
    );
};

const styles = StyleSheet.create({
    horizontal: {
        alignSelf: 'stretch',
    },
    vertical: {
        alignSelf: 'stretch',
    },
});

export default Divider;

