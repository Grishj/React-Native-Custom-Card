import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { colors, borderRadius as defaultBorderRadius } from '../styles/defaultStyles';
import { createShimmerAnimation } from '../utils/animations';
/**
 * Get border radius based on content shape
 */
const getShapeBorderRadius = (shape, size) => {
    switch (shape) {
        case 'circle':
            return size / 2;
        case 'rounded':
            return defaultBorderRadius.md;
        case 'rectangle':
        default:
            return defaultBorderRadius.sm;
    }
};
/**
 * Get transform configuration based on direction
 */
const getDirectionTransform = (animatedValue, direction) => {
    switch (direction) {
        case 'right-to-left':
            return {
                transform: [{
                        translateX: animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [200, -200],
                        })
                    }]
            };
        case 'top-to-bottom':
            return {
                transform: [{
                        translateY: animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-200, 200],
                        })
                    }]
            };
        case 'bottom-to-top':
            return {
                transform: [{
                        translateY: animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [200, -200],
                        })
                    }]
            };
        case 'left-to-right':
        default:
            return {
                transform: [{
                        translateX: animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-200, 200],
                        })
                    }]
            };
    }
};
/**
 * Shimmer component that displays an animated loading effect
 *
 * @example
 * ```tsx
 * // Basic shimmer (left-to-right, default)
 * <Shimmer width={200} height={20} borderRadius={4} />
 *
 * // Right-to-left shimmer
 * <Shimmer width={200} height={20} direction="right-to-left" />
 *
 * // Top-to-bottom shimmer
 * <Shimmer width={100} height={100} direction="top-to-bottom" />
 *
 * // Circular shimmer (e.g., for avatars)
 * <Shimmer width={50} height={50} contentShape="circle" />
 * ```
 */
const Shimmer = ({ width = '100%', height = 20, borderRadius, backgroundColor = colors.shimmerBackground, highlightColor = colors.shimmerHighlight, duration = 1500, adaptToContent = false, contentShape = 'rectangle', direction = 'left-to-right', style, }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        const animation = createShimmerAnimation(animatedValue, duration);
        animation.start();
        return () => {
            animation.stop();
        };
    }, [animatedValue, duration]);
    // Get transform based on direction
    const directionTransform = getDirectionTransform(animatedValue, direction);
    // Determine border radius based on shape or explicit value
    const effectiveBorderRadius = borderRadius !== undefined
        ? borderRadius
        : getShapeBorderRadius(contentShape, typeof height === 'number' ? height : 20);
    const containerStyle = {
        width: adaptToContent ? '100%' : (typeof width === 'number' ? width : undefined),
        height: adaptToContent ? '100%' : height,
        borderRadius: effectiveBorderRadius,
        backgroundColor,
    };
    // Handle string width (like '100%' or '50%')
    const widthStyle = typeof width === 'string' && !adaptToContent
        ? { width: width }
        : undefined;
    return (React.createElement(View, { style: [
            styles.container,
            containerStyle,
            widthStyle,
            adaptToContent && styles.adaptiveContainer,
            style,
        ] },
        React.createElement(Animated.View, { style: [
                styles.shimmer,
                {
                    backgroundColor: highlightColor,
                    ...directionTransform,
                },
            ] })));
};
const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    adaptiveContainer: {
        flex: 1,
    },
    shimmer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.5,
    },
});
export default Shimmer;
//# sourceMappingURL=Shimmer.js.map