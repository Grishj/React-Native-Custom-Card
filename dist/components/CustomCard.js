import React, { useEffect, useRef, useMemo } from 'react';
import { View, Animated, TouchableOpacity, StyleSheet, useWindowDimensions, Text } from 'react-native';
import { defaultStyles, colors, spacing, borderRadius as defaultBorderRadius } from '../styles/defaultStyles';
import { createAnimation, getAnimatedStyle } from '../utils/animations';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import ExpandableText from './ExpandableText';
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
/** Get overlay position styles */
const getOverlayPositionStyle = (position = 'top-right') => {
    switch (position) {
        case 'top-left': return { top: 0, left: 0 };
        case 'top-right': return { top: 0, right: 0 };
        case 'bottom-left': return { bottom: 0, left: 0 };
        case 'bottom-right': return { bottom: 0, right: 0 };
        case 'center': return { top: '50%', left: '50%' };
        default: return { top: 0, right: 0 };
    }
};
/**
 * ShimmerCard - Loading placeholder for CustomCard
 * Adapts to content structure - renders shimmer matching actual card content
 */
const ShimmerCard = ({ orientation = 'vertical', hasContent = true, showHeader = true, hasHeaderLeftItem = true, hasHeaderRightItem = false, showBody = true, hasDescription = false, contentType, descriptionPosition = 'bottom', showFooter = false, showHeaderDivider = false, showFooterDivider = false, style, 
// Horizontal specific props
hasLeftItem = false, hasRightItem = false, leftItemShape = 'rounded', leftItemWidth = 80, leftItemHeight = 80, rightItemShape = 'rounded', rightItemWidth = 24, rightItemHeight = 24, hasTitle = false, hasSubtitle = false, hasBodyDescription = false, bodyTitleWidth = '70%', bodySubtitleWidth = '50%', bodyDescriptionWidth = '90%', bodyTextShimmerItems, 
// Vertical specific props
headerLeftItemWidth = 44, headerLeftItemHeight = 44, headerLeftItemShape = 'circle', headerRightItemWidth = 24, headerRightItemHeight = 24, headerRightItemShape = 'rounded', headerTitleWidth = '70%', headerSubtitleWidth = '40%', bodyShimmerItems, footerShimmerItems, descriptionShimmerItems, shimmerDirection = 'left-to-right', headerShimmerItem, bodyShimmerItem, footerShimmerItem, 
// Content strings for auto-sizing
titleContent, subtitleContent, descriptionContent, headerTitleContent, headerSubtitleContent, }) => {
    const isHorizontal = orientation === 'horizontal';
    // Helper function to calculate shimmer dimensions from ShimmerItemConfig
    // Uses text content and fontSize to estimate width, or falls back to explicit values
    // Caps width to maxWidth or '100%' to prevent overflow
    const getShimmerDimensions = (item, contentMap) => {
        // Flatten style to extract width/height if provided in style prop
        const flattenedStyle = item.style ? StyleSheet.flatten(item.style) : {};
        const styleWidth = (typeof flattenedStyle.width === 'number' || typeof flattenedStyle.width === 'string') ? flattenedStyle.width : undefined;
        const styleHeight = typeof flattenedStyle.height === 'number' ? flattenedStyle.height : undefined;
        let width = item.width || styleWidth || '100%';
        let height = item.height || styleHeight || 14;
        let isMultiLine = false;
        // Resolve text to use: either explicit item.text or from source
        let textToMeasure = item.text;
        // Use provided content map (context-specific) or fall back to default body content
        const sourceMap = contentMap || {
            title: titleContent,
            subtitle: subtitleContent,
            description: descriptionContent,
            headerTitle: headerTitleContent,
            headerSubtitle: headerSubtitleContent
        };
        if (!textToMeasure && item.source) {
            switch (item.source) {
                case 'title':
                    textToMeasure = sourceMap.title || sourceMap.headerTitle;
                    break;
                case 'subtitle':
                    textToMeasure = sourceMap.subtitle || sourceMap.headerSubtitle;
                    break;
                case 'description':
                    textToMeasure = sourceMap.description;
                    break;
                // Handle presets that don't map to text content but define shape/size
                case 'image':
                    return {
                        width: item.width || styleWidth || '100%',
                        height: item.height || styleHeight || 200,
                        isMultiLine: false,
                        shape: item.shape || 'rounded' // Add shape to return if needed, currently only dims
                    };
                case 'text':
                    // Generic text preset
                    return {
                        width: item.width || styleWidth || '100%',
                        height: item.height || styleHeight || 16,
                        isMultiLine: false
                    };
                case 'leftItem':
                    return {
                        width: item.width || styleWidth || 40,
                        height: item.height || styleHeight || 40,
                        isMultiLine: false,
                        shape: item.shape || 'circle'
                    };
                case 'rightItem':
                    return {
                        width: item.width || styleWidth || 40,
                        height: item.height || styleHeight || 40,
                        isMultiLine: false,
                        shape: item.shape || 'circle'
                    };
            }
        }
        // If text is provided, calculate width based on text length
        if (textToMeasure) {
            const fontSize = item.fontSize || 14;
            // Approximate character width is roughly 0.6 of fontSize for most fonts
            const charWidthFactor = 0.6;
            const calculatedWidth = Math.ceil(textToMeasure.length * fontSize * charWidthFactor);
            // Apply maxWidth constraint if provided, otherwise default to '100%' if too wide
            // Typical card content area is around 280-350px, cap at maxWidth or use percentage
            if (item.maxWidth) {
                width = Math.min(calculatedWidth, item.maxWidth);
            }
            else {
                // If calculated width seems too large (> 280px typical), use percentage instead
                if (calculatedWidth > 280) {
                    width = '100%';
                    isMultiLine = true;
                }
                else {
                    width = calculatedWidth;
                }
            }
            // Height defaults to fontSize + some padding if not explicitly set
            if (!item.height) {
                height = fontSize + 4;
            }
        }
        return { width, height, isMultiLine };
    };
    const renderShimmerFromConfig = (item, contentMap) => {
        if (!item)
            return null;
        const { width, height, isMultiLine, shape } = getShimmerDimensions(item, contentMap);
        // Merge specific layout props and custom style into a single style object
        const containerStyle = [
            item.marginBottom !== undefined && { marginBottom: item.marginBottom },
            item.marginTop !== undefined && { marginTop: item.marginTop },
            item.marginLeft !== undefined && { marginLeft: item.marginLeft },
            item.marginRight !== undefined && { marginRight: item.marginRight },
            item.marginVertical !== undefined && { marginVertical: item.marginVertical },
            item.marginHorizontal !== undefined && { marginHorizontal: item.marginHorizontal },
            item.style
        ];
        if (isMultiLine) {
            return (React.createElement(View, { style: containerStyle },
                React.createElement(Shimmer, { width: "100%", height: height, contentShape: shape || item.shape || 'rectangle', direction: shimmerDirection, style: { marginBottom: 6 }, borderRadius: item.borderRadius }),
                React.createElement(Shimmer, { width: "50%", height: height, contentShape: shape || item.shape || 'rectangle', direction: shimmerDirection, borderRadius: item.borderRadius })));
        }
        return (React.createElement(Shimmer, { width: width, height: height, contentShape: shape || item.shape || 'rectangle', direction: shimmerDirection, style: containerStyle, borderRadius: item.borderRadius }));
    };
    // Custom description shimmer renderer
    const renderDescriptionShimmer = () => {
        if (descriptionShimmerItems && descriptionShimmerItems.length > 0) {
            return (React.createElement(React.Fragment, null, descriptionShimmerItems.map((item, index) => (React.createElement(React.Fragment, { key: index }, renderShimmerFromConfig(item))))));
        }
        // Default description shimmer
        return (React.createElement(React.Fragment, null,
            React.createElement(Shimmer, { width: "100%", height: 14, direction: shimmerDirection, style: { marginBottom: 6 } }),
            React.createElement(Shimmer, { width: "90%", height: 14, direction: shimmerDirection, style: { marginBottom: 6 } }),
            React.createElement(Shimmer, { width: "60%", height: 14, direction: shimmerDirection })));
    };
    // Description shimmer element for vertical cards
    const descriptionShimmer = (hasDescription || descriptionShimmerItems) ? (React.createElement(View, { style: (contentType && descriptionPosition) ? { marginTop: descriptionPosition === 'bottom' ? 12 : 0, marginBottom: descriptionPosition === 'top' ? 12 : 0 } : undefined }, renderDescriptionShimmer())) : null;
    // Text content shimmer (for text-type children)
    const textShimmer = (React.createElement(React.Fragment, null,
        React.createElement(Shimmer, { width: "100%", height: 16, direction: shimmerDirection, style: { marginBottom: 8 } }),
        React.createElement(Shimmer, { width: "100%", height: 16, direction: shimmerDirection, style: { marginBottom: 8 } }),
        React.createElement(Shimmer, { width: "70%", height: 16, direction: shimmerDirection })));
    // Image content shimmer (for image-type children)
    const imageShimmer = (React.createElement(Shimmer, { width: "100%", height: 180, contentShape: "rounded", direction: shimmerDirection }));
    // Mixed content shimmer (image + text)
    const mixedShimmer = (React.createElement(React.Fragment, null,
        React.createElement(Shimmer, { width: "100%", height: 150, contentShape: "rounded", direction: shimmerDirection, style: { marginBottom: 12 } }),
        React.createElement(Shimmer, { width: "100%", height: 14, direction: shimmerDirection, style: { marginBottom: 6 } }),
        React.createElement(Shimmer, { width: "80%", height: 14, direction: shimmerDirection })));
    // Get appropriate children shimmer based on contentType or bodyShimmerItems
    const getChildrenShimmer = () => {
        // If custom body shimmer items are provided, use them
        if (bodyShimmerItems && bodyShimmerItems.length > 0) {
            return (React.createElement(React.Fragment, null, bodyShimmerItems.map((item, index) => (React.createElement(React.Fragment, { key: index }, renderShimmerFromConfig(item))))));
        }
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
    // Get footer shimmer content
    const getFooterShimmer = () => {
        // If custom footer shimmer items are provided, use them
        if (footerShimmerItems && footerShimmerItems.length > 0) {
            return (React.createElement(React.Fragment, null, footerShimmerItems.map((item, index) => (React.createElement(React.Fragment, { key: index }, renderShimmerFromConfig(item))))));
        }
        // Default footer shimmer
        return (React.createElement(React.Fragment, null,
            React.createElement(Shimmer, { width: 70, height: 28, contentShape: "rounded", direction: shimmerDirection }),
            React.createElement(Shimmer, { width: 90, height: 28, contentShape: "rounded", direction: shimmerDirection })));
    };
    const childrenShimmer = getChildrenShimmer();
    return (React.createElement(View, { style: [defaultStyles.shimmerCard, style] },
        React.createElement(View, { style: isHorizontal ? styles.shimmerHorizontal : styles.shimmerVertical }, isHorizontal ? (React.createElement(React.Fragment, null,
            hasLeftItem && (React.createElement(Shimmer, { width: leftItemWidth, height: leftItemHeight, contentShape: leftItemShape, direction: shimmerDirection, style: { marginRight: 12 } })),
            React.createElement(View, { style: { flex: 1, justifyContent: 'center' } }, bodyTextShimmerItems && bodyTextShimmerItems.length > 0 ? (bodyTextShimmerItems.map((item, index) => (React.createElement(React.Fragment, { key: index }, renderShimmerFromConfig(item))))) : (React.createElement(React.Fragment, null,
                hasTitle && React.createElement(Shimmer, { width: bodyTitleWidth, height: 16, direction: shimmerDirection, style: { marginBottom: 8 } }),
                hasSubtitle && React.createElement(Shimmer, { width: bodySubtitleWidth, height: 14, direction: shimmerDirection, style: { marginBottom: 6 } }),
                hasBodyDescription && renderDescriptionShimmer(),
                !hasTitle && !hasSubtitle && !hasBodyDescription && (React.createElement(React.Fragment, null,
                    React.createElement(Shimmer, { width: "70%", height: 16, direction: shimmerDirection, style: { marginBottom: 8 } }),
                    React.createElement(Shimmer, { width: "50%", height: 14, direction: shimmerDirection })))))),
            hasRightItem && (React.createElement(Shimmer, { width: rightItemWidth, height: rightItemHeight, contentShape: rightItemShape, direction: shimmerDirection, style: { marginLeft: 12 } })))) : (React.createElement(React.Fragment, null,
            showHeader && (React.createElement(View, { style: styles.shimmerHeader }, headerShimmerItem ? (React.createElement(React.Fragment, null,
                renderShimmerFromConfig(headerShimmerItem.leftItem),
                React.createElement(View, { style: [styles.shimmerHeaderText, !headerShimmerItem.leftItem && { marginLeft: 0 }] },
                    renderShimmerFromConfig(headerShimmerItem.title, { title: headerTitleContent, subtitle: headerSubtitleContent }),
                    renderShimmerFromConfig(headerShimmerItem.subtitle, { title: headerTitleContent, subtitle: headerSubtitleContent })),
                renderShimmerFromConfig(headerShimmerItem.rightItem))) : (React.createElement(React.Fragment, null,
                hasHeaderLeftItem && (React.createElement(Shimmer, { width: headerLeftItemWidth, height: headerLeftItemHeight, contentShape: headerLeftItemShape, direction: shimmerDirection })),
                React.createElement(View, { style: [styles.shimmerHeaderText, !hasHeaderLeftItem && { marginLeft: 0 }] },
                    React.createElement(Shimmer, { width: headerTitleWidth, height: 18, direction: shimmerDirection, style: { marginBottom: 8 } }),
                    React.createElement(Shimmer, { width: headerSubtitleWidth, height: 14, direction: shimmerDirection })),
                hasHeaderRightItem && (React.createElement(Shimmer, { width: headerRightItemWidth, height: headerRightItemHeight, contentShape: headerRightItemShape, direction: shimmerDirection })))))),
            showHeaderDivider && showHeader && (React.createElement(View, { style: styles.shimmerDivider },
                React.createElement(Shimmer, { width: "100%", height: 1, direction: shimmerDirection }))),
            showBody && (React.createElement(View, { style: styles.shimmerBody }, bodyShimmerItem ? (React.createElement(React.Fragment, null,
                renderShimmerFromConfig(bodyShimmerItem.title),
                renderShimmerFromConfig(bodyShimmerItem.subtitle),
                descriptionPosition === 'top' && renderShimmerFromConfig(bodyShimmerItem.description),
                bodyShimmerItem.children && bodyShimmerItem.children.map((child, idx) => (React.createElement(View, { key: idx }, renderShimmerFromConfig(child)))),
                descriptionPosition === 'bottom' && renderShimmerFromConfig(bodyShimmerItem.description))) : (React.createElement(React.Fragment, null,
                descriptionPosition === 'top' && descriptionShimmer,
                childrenShimmer,
                descriptionPosition === 'bottom' && descriptionShimmer,
                !hasDescription && !contentType && !bodyShimmerItems && textShimmer)))),
            showFooterDivider && showFooter && (React.createElement(View, { style: styles.shimmerDivider },
                React.createElement(Shimmer, { width: "100%", height: 1 }))),
            showFooter && (React.createElement(View, { style: styles.shimmerFooter }, footerShimmerItem ? (React.createElement(React.Fragment, null,
                renderShimmerFromConfig(footerShimmerItem.leftItem),
                React.createElement(View, { style: { flex: 1, marginLeft: footerShimmerItem.leftItem ? 12 : 0 } },
                    renderShimmerFromConfig(footerShimmerItem.title),
                    renderShimmerFromConfig(footerShimmerItem.subtitle),
                    footerShimmerItem.children && footerShimmerItem.children.map((child, idx) => (React.createElement(View, { key: idx }, renderShimmerFromConfig(child))))),
                renderShimmerFromConfig(footerShimmerItem.rightItem))) : (getFooterShimmer()))))))));
};
/**
 * CustomCard - A comprehensive, customizable card component for React Native
 *
 * Supports two orientations with type-safe prop suggestions:
 * - Vertical (default): Use header, footer, showHeaderDivider, showFooterDivider
 * - Horizontal: Use leftItem, rightItem, and horizontal shimmer props
 */
const CustomCard = (externalProps) => {
    // Cast to internal type to access all props uniformly
    // External consumers get discriminated union type safety
    const { header, body, footer, leftItem, rightItem, isLoading = false, animated = false, animationType = 'fade', animationDuration = 300, orientation = 'vertical', showHeaderDivider = false, showFooterDivider = false, dividerProps, style, backgroundColor = colors.background, borderRadius = defaultBorderRadius.lg, elevation = 3, padding = spacing.lg, margin, onPress, testID, gradient, GradientComponent, responsiveSize, leftItemShimmerShape = 'rounded', leftItemShimmerWidth = 80, leftItemShimmerHeight = 80, rightItemShimmerShape = 'rounded', rightItemShimmerWidth = 24, rightItemShimmerHeight = 24, bodyTitleShimmerWidth = '70%', bodySubtitleShimmerWidth = '50%', bodyDescriptionShimmerWidth = '90%', bodyTextShimmerItems, 
    // Vertical card shimmer props
    headerLeftItemShimmerWidth = 44, headerLeftItemShimmerHeight = 44, headerLeftItemShimmerShape = 'circle', headerRightItemShimmerWidth = 24, headerRightItemShimmerHeight = 24, headerRightItemShimmerShape = 'rounded', headerTitleShimmerWidth = '70%', headerSubtitleShimmerWidth = '40%', bodyShimmerItems, footerShimmerItems, descriptionShimmerItems, shimmerDirection = 'left-to-right', headerShimmerItem, bodyShimmerItem, footerShimmerItem, } = externalProps;
    const animatedValue = useRef(new Animated.Value(animated ? 0 : 1)).current;
    const { width: screenWidth } = useWindowDimensions();
    const isHorizontal = orientation === 'horizontal';
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
    // Build base card styles (excluding animation)
    const baseCardStyles = [
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
        style,
    ];
    // Check if card has any content (for shimmer adaptation)
    const hasContent = Boolean(header || body || footer);
    // Show shimmer loading state - pass content structure for adaptive shimmer
    if (isLoading) {
        const bodyAsProps = body && typeof body === 'object' && ('children' in body || 'description' in body || 'title' in body) ? body : null;
        return (React.createElement(ShimmerCard, { style: baseCardStyles, orientation: orientation, hasContent: hasContent, showHeader: Boolean(header), hasHeaderLeftItem: Boolean(header?.leftItem), hasHeaderRightItem: Boolean(header?.rightItem), showBody: Boolean(body), hasDescription: Boolean(bodyAsProps?.description), contentType: bodyAsProps?.children ? (bodyAsProps.contentType || 'text') : undefined, descriptionPosition: bodyAsProps?.descriptionPosition || 'bottom', showFooter: Boolean(footer), showHeaderDivider: showHeaderDivider, showFooterDivider: showFooterDivider, 
            // Horizontal-specific props for adaptive shimmer
            hasLeftItem: Boolean(leftItem), hasRightItem: Boolean(rightItem), leftItemShape: leftItemShimmerShape, leftItemWidth: leftItemShimmerWidth, leftItemHeight: leftItemShimmerHeight, rightItemShape: rightItemShimmerShape, rightItemWidth: rightItemShimmerWidth, rightItemHeight: rightItemShimmerHeight, hasTitle: Boolean(bodyAsProps?.title), hasSubtitle: Boolean(bodyAsProps?.subtitle), hasBodyDescription: Boolean(bodyAsProps?.description), bodyTitleWidth: bodyTitleShimmerWidth, bodySubtitleWidth: bodySubtitleShimmerWidth, bodyDescriptionWidth: bodyDescriptionShimmerWidth, bodyTextShimmerItems: bodyTextShimmerItems, 
            // Vertical-specific props for adaptive shimmer
            headerLeftItemWidth: headerLeftItemShimmerWidth, headerLeftItemHeight: headerLeftItemShimmerHeight, headerLeftItemShape: headerLeftItemShimmerShape, headerRightItemWidth: headerRightItemShimmerWidth, headerRightItemHeight: headerRightItemShimmerHeight, headerRightItemShape: headerRightItemShimmerShape, headerTitleWidth: headerTitleShimmerWidth, headerSubtitleWidth: headerSubtitleShimmerWidth, bodyShimmerItems: bodyShimmerItems, footerShimmerItems: footerShimmerItems, descriptionShimmerItems: descriptionShimmerItems, shimmerDirection: shimmerDirection, headerShimmerItem: headerShimmerItem, bodyShimmerItem: bodyShimmerItem, footerShimmerItem: footerShimmerItem, 
            // Pass content to ShimmerCard for auto-sizing
            titleContent: bodyAsProps?.title, subtitleContent: bodyAsProps?.subtitle, descriptionContent: typeof bodyAsProps?.description === 'string' ? bodyAsProps.description : bodyAsProps?.description?.text, headerTitleContent: header?.title, headerSubtitleContent: header?.subtitle }));
    }
    const animatedStyle = animated ? getAnimatedStyle(animatedValue, animationType) : {};
    // Determine divider orientation based on card orientation (can be overridden)
    const effectiveDividerOrientation = dividerProps?.orientation || (isHorizontal ? 'vertical' : 'horizontal');
    const effectiveDividerProps = {
        ...dividerProps,
        orientation: effectiveDividerOrientation,
    };
    // Card inner content - different for horizontal vs vertical
    const isHorizontalBodyProps = isHorizontal && body && typeof body === 'object' && ('title' in body || 'subtitle' in body || 'description' in body || 'children' in body);
    const hBody = isHorizontalBodyProps ? body : null;
    // Helper to render overlay items
    const renderOverlayItems = (items) => items?.map((item, index) => (React.createElement(View, { key: index, style: [
            styles.overlay,
            getOverlayPositionStyle(item.position),
            item.offsetX !== undefined && { marginLeft: item.offsetX, marginRight: -item.offsetX },
            item.offsetY !== undefined && { marginTop: item.offsetY, marginBottom: -item.offsetY },
            item.style,
        ] }, item.content)));
    const cardInnerContent = isHorizontal ? (React.createElement(View, { style: styles.horizontalContent },
        leftItem && React.createElement(View, null, leftItem),
        React.createElement(View, { style: [styles.horizontalBodyCenter, !hBody?.overlayOnChildrenOnly && hBody?.overlayItems && { position: 'relative' }] },
            hBody && (React.createElement(React.Fragment, null,
                hBody.title && React.createElement(Text, { style: [styles.horizontalTitle, hBody.titleStyle] }, hBody.title),
                hBody.subtitle && React.createElement(Text, { style: [styles.horizontalSubtitle, hBody.subtitleStyle] }, hBody.subtitle),
                hBody.description && (typeof hBody.description === 'string' ? (React.createElement(ExpandableText, { text: hBody.description, maxLength: hBody.maxDescriptionLength, expandText: hBody.expandText, collapseText: hBody.collapseText, textStyle: [styles.horizontalDescription, hBody.descriptionStyle], toggleStyle: hBody.descriptionToggleStyle })) : (React.createElement(ExpandableText, { text: hBody.description.text, maxLength: hBody.description.maxLength, expandText: hBody.description.expandText, collapseText: hBody.description.collapseText, textStyle: [styles.horizontalDescription, hBody.descriptionStyle], toggleStyle: hBody.description.toggleStyle || hBody.descriptionToggleStyle }))),
                hBody.overlayOnChildrenOnly && hBody.children ? (React.createElement(View, { style: { position: 'relative' } },
                    hBody.children,
                    renderOverlayItems(hBody.overlayItems))) : (hBody.children),
                !hBody.overlayOnChildrenOnly && renderOverlayItems(hBody.overlayItems))),
            body && !hBody && body),
        rightItem && React.createElement(View, null, rightItem))) : (React.createElement(React.Fragment, null,
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
        cardContent = (React.createElement(Animated.View, { testID: testID, style: [...baseCardStyles, animatedStyle, { overflow: 'hidden' }] },
            React.createElement(GradientComponent, { colors: gradientColors, start: gradientPoints.start, end: gradientPoints.end, style: StyleSheet.absoluteFillObject }),
            cardInnerContent));
    }
    else {
        // Fallback background color if gradient is requested but no component provided
        const fallbackBackground = gradientConfig ? gradientConfig.from : backgroundColor;
        cardContent = (React.createElement(Animated.View, { testID: testID, style: [
                ...baseCardStyles,
                animatedStyle
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
    shimmerHorizontalContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    shimmerHorizontalBody: {
        flex: 1,
        marginHorizontal: 12,
    },
    horizontalContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    horizontalBodyCenter: {
        flex: 1,
        marginHorizontal: 12,
    },
    horizontalTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    horizontalSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 2,
    },
    horizontalDescription: {
        fontSize: 12,
        color: '#9CA3AF',
        marginTop: 4,
    },
    overlay: {
        position: 'absolute',
        zIndex: 10,
    },
});
export default CustomCard;
//# sourceMappingURL=CustomCard.js.map