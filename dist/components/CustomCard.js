import React, { useEffect, useRef, useMemo } from 'react';
import { View, Animated, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { defaultStyles, colors, spacing, borderRadius as defaultBorderRadius } from '../styles/defaultStyles';
import { createAnimation, getAnimatedStyle } from '../utils/animations';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import Divider from './Divider';
import Shimmer from './Shimmer';
/**
 * Default gradient colors
 */
const DEFAULT_GRADIENT = {
    from: '#667eea',
    to: '#764ba2',
    direction: 'diagonal',
};
/**
 * Get gradient start/end points based on direction
 */
const getGradientPoints = (direction) => {
    switch (direction) {
        case 'to-right':
            return { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } };
        case 'to-left':
            return { start: { x: 1, y: 0.5 }, end: { x: 0, y: 0.5 } };
        case 'to-top':
            return { start: { x: 0.5, y: 1 }, end: { x: 0.5, y: 0 } };
        case 'to-bottom':
            return { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } };
        case 'diagonal':
        default:
            return { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } };
    }
};
/**
 * ShimmerCard - Loading placeholder for CustomCard
 * Adapts to content structure - renders shimmer matching actual card content
 */
const ShimmerCard = ({ orientation = 'vertical', hasContent = true, showHeader = true, hasHeaderLeftItem = true, hasHeaderRightItem = false, showBody = true, hasDescription = false, contentType, descriptionPosition = 'bottom', showFooter = false, showHeaderDivider = false, showFooterDivider = false, style, }) => {
    const isHorizontal = orientation === 'horizontal';
    // If no content structure is provided, show full card shimmer
    if (!hasContent) {
        return (React.createElement(View, { style: [defaultStyles.shimmerCard, styles.fullShimmerCard, style] },
            React.createElement(Shimmer, { adaptToContent: true, contentShape: "rounded" })));
    }
    // Description shimmer element
    const descriptionShimmer = hasDescription ? (React.createElement(View, { style: contentType ? { marginTop: descriptionPosition === 'bottom' ? 12 : 0, marginBottom: descriptionPosition === 'top' ? 12 : 0 } : undefined },
        React.createElement(Shimmer, { width: "100%", height: 14, style: { marginBottom: 6 } }),
        React.createElement(Shimmer, { width: "90%", height: 14, style: { marginBottom: 6 } }),
        React.createElement(Shimmer, { width: "60%", height: 14 }))) : null;
    // Text content shimmer (for text-type children)
    const textShimmer = (React.createElement(React.Fragment, null,
        React.createElement(Shimmer, { width: "100%", height: 16, style: { marginBottom: 8 } }),
        React.createElement(Shimmer, { width: "100%", height: 16, style: { marginBottom: 8 } }),
        React.createElement(Shimmer, { width: "70%", height: 16 })));
    // Image content shimmer (for image-type children)
    const imageShimmer = (React.createElement(Shimmer, { width: "100%", height: 180, contentShape: "rounded" }));
    // Mixed content shimmer (image + text)
    const mixedShimmer = (React.createElement(React.Fragment, null,
        React.createElement(Shimmer, { width: "100%", height: 150, contentShape: "rounded", style: { marginBottom: 12 } }),
        React.createElement(Shimmer, { width: "100%", height: 14, style: { marginBottom: 6 } }),
        React.createElement(Shimmer, { width: "80%", height: 14 })));
    // Get appropriate children shimmer based on contentType
    const getChildrenShimmer = () => {
        if (!contentType)
            return null;
        switch (contentType) {
            case 'image':
                return imageShimmer;
            case 'mixed':
                return mixedShimmer;
            case 'text':
            default:
                return textShimmer;
        }
    };
    const childrenShimmer = getChildrenShimmer();
    return (React.createElement(View, { style: [defaultStyles.shimmerCard, style] },
        React.createElement(View, { style: isHorizontal ? styles.shimmerHorizontal : styles.shimmerVertical },
            showHeader && (React.createElement(View, { style: styles.shimmerHeader },
                hasHeaderLeftItem && (React.createElement(Shimmer, { width: 44, height: 44, contentShape: "circle" })),
                React.createElement(View, { style: [styles.shimmerHeaderText, !hasHeaderLeftItem && { marginLeft: 0 }] },
                    React.createElement(Shimmer, { width: "70%", height: 18, style: { marginBottom: 8 } }),
                    React.createElement(Shimmer, { width: "40%", height: 14 })),
                hasHeaderRightItem && (React.createElement(Shimmer, { width: 24, height: 24, contentShape: "rounded" })))),
            showHeaderDivider && showHeader && (React.createElement(View, { style: styles.shimmerDivider },
                React.createElement(Shimmer, { width: "100%", height: 1 }))),
            showBody && (React.createElement(View, { style: styles.shimmerBody },
                descriptionPosition === 'top' && descriptionShimmer,
                childrenShimmer,
                descriptionPosition === 'bottom' && descriptionShimmer,
                !hasDescription && !contentType && textShimmer)),
            showFooterDivider && showFooter && (React.createElement(View, { style: styles.shimmerDivider },
                React.createElement(Shimmer, { width: "100%", height: 1 }))),
            showFooter && (React.createElement(View, { style: styles.shimmerFooter },
                React.createElement(Shimmer, { width: 70, height: 28, contentShape: "rounded" }),
                React.createElement(Shimmer, { width: 90, height: 28, contentShape: "rounded" }))))));
};
/**
 * CustomCard - A comprehensive, customizable card component for React Native
 */
const CustomCard = ({ header, body, footer, isLoading = false, animated = false, animationType = 'fade', animationDuration = 300, orientation = 'vertical', showHeaderDivider = false, showFooterDivider = false, dividerProps, style, backgroundColor = colors.background, borderRadius = defaultBorderRadius.lg, elevation = 3, padding = spacing.lg, margin, onPress, testID, gradient, GradientComponent, responsiveSize, }) => {
    const animatedValue = useRef(new Animated.Value(animated ? 0 : 1)).current;
    const { width: screenWidth } = useWindowDimensions();
    useEffect(() => {
        if (animated && !isLoading) {
            const animation = createAnimation(animatedValue, animationType, animationDuration);
            if (animation) {
                animation.start();
            }
        }
    }, [animated, isLoading, animatedValue, animationType, animationDuration]);
    // Parse gradient configuration
    const gradientConfig = useMemo(() => {
        if (!gradient)
            return null;
        if (gradient === true) {
            return { enabled: true, ...DEFAULT_GRADIENT };
        }
        return gradient.enabled ? gradient : null;
    }, [gradient]);
    // Parse responsive size configuration
    const responsiveSizeConfig = useMemo(() => {
        if (!responsiveSize)
            return null;
        if (responsiveSize === true) {
            return { enabled: true, tabletBreakpoint: 768, maxWidth: 600 };
        }
        return responsiveSize.enabled !== false ? responsiveSize : null;
    }, [responsiveSize]);
    // Calculate responsive width
    const responsiveWidth = useMemo(() => {
        if (!responsiveSizeConfig)
            return undefined;
        const { minWidth, maxWidth, tabletBreakpoint = 768 } = responsiveSizeConfig;
        const isTablet = screenWidth >= tabletBreakpoint;
        let width = '100%';
        if (isTablet && maxWidth) {
            width = typeof maxWidth === 'number' ? Math.min(maxWidth, screenWidth - 32) : maxWidth;
        }
        if (minWidth) {
            const minW = typeof minWidth === 'number' ? minWidth : parseInt(minWidth, 10);
            if (typeof width === 'number' && width < minW) {
                width = minW;
            }
        }
        return width;
    }, [responsiveSizeConfig, screenWidth]);
    // Check if card has any content (for shimmer adaptation)
    const hasContent = Boolean(header || body || footer);
    // Show shimmer loading state - pass content structure for adaptive shimmer
    if (isLoading) {
        return (React.createElement(ShimmerCard, { orientation: orientation, hasContent: hasContent, showHeader: Boolean(header), hasHeaderLeftItem: Boolean(header?.leftItem), hasHeaderRightItem: Boolean(header?.rightItem), showBody: Boolean(body), hasDescription: Boolean(body?.description), contentType: body?.children ? (body.contentType || 'text') : undefined, descriptionPosition: body?.descriptionPosition || 'bottom', showFooter: Boolean(footer), showHeaderDivider: showHeaderDivider, showFooterDivider: showFooterDivider, style: style }));
    }
    const isHorizontal = orientation === 'horizontal';
    const animatedStyle = animated ? getAnimatedStyle(animatedValue, animationType) : {};
    // Determine divider orientation based on card orientation (can be overridden)
    const effectiveDividerOrientation = dividerProps?.orientation || (isHorizontal ? 'vertical' : 'horizontal');
    const effectiveDividerProps = {
        ...dividerProps,
        orientation: effectiveDividerOrientation,
    };
    // Build card styles
    const cardStyles = [
        defaultStyles.card,
        isHorizontal ? styles.cardHorizontalWrap : defaultStyles.cardVertical,
        {
            borderRadius,
            elevation,
            padding,
            ...(margin !== undefined && { margin }),
            ...(responsiveWidth !== undefined && {
                width: responsiveWidth,
                alignSelf: 'center',
            }),
        },
        // Only apply background color if no gradient
        !gradientConfig && { backgroundColor },
        animatedStyle,
        style,
    ];
    // Card inner content
    const cardInnerContent = (React.createElement(React.Fragment, null,
        header && React.createElement(CardHeader, { ...header }),
        showHeaderDivider && header && React.createElement(Divider, { ...effectiveDividerProps }),
        body && React.createElement(CardBody, { ...body }),
        showFooterDivider && footer && React.createElement(Divider, { ...effectiveDividerProps }),
        footer && React.createElement(CardFooter, { ...footer })));
    // Build card content
    let cardContent;
    // Handle gradient background
    if (gradientConfig && GradientComponent) {
        const gradientColors = (gradientConfig.stops && gradientConfig.stops.length >= 2
            ? gradientConfig.stops
            : [gradientConfig.from, gradientConfig.to]);
        const gradientPoints = getGradientPoints(gradientConfig.direction || 'diagonal');
        cardContent = (React.createElement(Animated.View, { testID: testID, style: [...cardStyles.filter(s => s), { overflow: 'hidden' }] },
            React.createElement(GradientComponent, { colors: gradientColors, start: gradientPoints.start, end: gradientPoints.end, style: StyleSheet.absoluteFillObject }),
            cardInnerContent));
    }
    else {
        // Fallback background color if gradient is requested but no component provided
        const fallbackBackground = gradientConfig ? gradientConfig.from : backgroundColor;
        cardContent = (React.createElement(Animated.View, { testID: testID, style: [
                ...cardStyles.filter(s => s),
                { backgroundColor: fallbackBackground },
            ] }, cardInnerContent));
    }
    // Wrap with TouchableOpacity if onPress is provided
    if (onPress) {
        return (React.createElement(TouchableOpacity, { activeOpacity: 0.8, onPress: onPress }, cardContent));
    }
    return cardContent;
};
const styles = StyleSheet.create({
    shimmerHorizontal: {
        flexDirection: 'row',
    },
    shimmerVertical: {
        flexDirection: 'column',
    },
    shimmerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    shimmerHeaderText: {
        flex: 1,
        marginLeft: 12,
    },
    shimmerBody: {
        marginBottom: 16,
    },
    shimmerFooter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 8,
    },
    shimmerDivider: {
        marginVertical: 12,
    },
    fullShimmerCard: {
        minHeight: 150,
    },
    cardHorizontalWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
});
export default CustomCard;
//# sourceMappingURL=CustomCard.js.map