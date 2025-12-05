import React, { useEffect, useRef, useMemo } from 'react';
import { View, Animated, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, useWindowDimensions, Text } from 'react-native';
import { CustomCardProps, GradientConfig, ResponsiveSizeConfig, ShimmerCardProps } from '../types';
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
    direction: 'diagonal' as const,
};

/**
 * Get gradient start/end points based on direction
 */
const getGradientPoints = (direction: string) => {
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
const getOverlayPositionStyle = (position: string = 'top-right') => {
    switch (position) {
        case 'top-left': return { top: 0, left: 0 };
        case 'top-right': return { top: 0, right: 0 };
        case 'bottom-left': return { bottom: 0, left: 0 };
        case 'bottom-right': return { bottom: 0, right: 0 };
        case 'center': return { top: '50%' as const, left: '50%' as const };
        default: return { top: 0, right: 0 };
    }
};

/**
 * ShimmerCard - Loading placeholder for CustomCard
 * Adapts to content structure - renders shimmer matching actual card content
 */
const ShimmerCard: React.FC<ShimmerCardProps> = ({
    orientation = 'vertical',
    hasContent = true,
    showHeader = true,
    hasHeaderLeftItem = true,
    hasHeaderRightItem = false,
    showBody = true,
    hasDescription = false,
    contentType,
    descriptionPosition = 'bottom',
    showFooter = false,
    showHeaderDivider = false,
    showFooterDivider = false,
    style,
    // Horizontal specific props
    hasLeftItem = false,
    hasRightItem = false,
    leftItemShape = 'rounded',
    leftItemWidth = 80,
    leftItemHeight = 80,
    rightItemShape = 'rounded',
    rightItemWidth = 24,
    rightItemHeight = 24,
    hasTitle = false,
    hasSubtitle = false,
    hasBodyDescription = false,
    bodyTitleWidth = '70%',
    bodySubtitleWidth = '50%',
    bodyDescriptionWidth = '90%',
    // Vertical specific props
    headerLeftItemWidth = 44,
    headerLeftItemHeight = 44,
    headerLeftItemShape = 'circle',
    headerRightItemWidth = 24,
    headerRightItemHeight = 24,
    headerRightItemShape = 'rounded',
    headerTitleWidth = '70%',
    headerSubtitleWidth = '40%',
    bodyShimmerItems,
    footerShimmerItems,
    descriptionShimmerItems,
}) => {
    const isHorizontal = orientation === 'horizontal';

    // If no content structure is provided, show full card shimmer
    if (!hasContent) {
        return (
            <View style={[defaultStyles.shimmerCard, styles.fullShimmerCard, style]}>
                <Shimmer adaptToContent contentShape="rounded" />
            </View>
        );
    }

    // Helper function to calculate shimmer dimensions from ShimmerItemConfig
    // Uses text content and fontSize to estimate width, or falls back to explicit values
    // Caps width to maxWidth or '100%' to prevent overflow
    const getShimmerDimensions = (item: any) => {
        let width: number | string = item.width || '100%';
        let height = item.height || 14;

        // If text is provided, calculate width based on text length
        if (item.text) {
            const fontSize = item.fontSize || 14;
            // Approximate character width is roughly 0.6 of fontSize for most fonts
            const charWidthFactor = 0.6;
            const calculatedWidth = Math.ceil(item.text.length * fontSize * charWidthFactor);

            // Apply maxWidth constraint if provided, otherwise default to '100%' if too wide
            // Typical card content area is around 280-350px, cap at maxWidth or use percentage
            if (item.maxWidth) {
                width = Math.min(calculatedWidth, item.maxWidth);
            } else {
                // If calculated width seems too large (> 280px typical), use percentage instead
                width = calculatedWidth > 280 ? '100%' : calculatedWidth;
            }

            // Height defaults to fontSize + some padding if not explicitly set
            if (!item.height) {
                height = fontSize + 4;
            }
        }

        return { width, height };
    };

    // Custom description shimmer renderer
    const renderDescriptionShimmer = () => {
        if (descriptionShimmerItems && descriptionShimmerItems.length > 0) {
            return (
                <>
                    {descriptionShimmerItems.map((item, index) => {
                        const { width, height } = getShimmerDimensions(item);
                        return (
                            <Shimmer
                                key={index}
                                width={width}
                                height={height}
                                contentShape={item.shape || 'rectangle'}
                                style={item.marginBottom ? { marginBottom: item.marginBottom } : undefined}
                            />
                        );
                    })}
                </>
            );
        }
        // Default description shimmer
        return (
            <>
                <Shimmer width="100%" height={14} style={{ marginBottom: 6 }} />
                <Shimmer width="90%" height={14} style={{ marginBottom: 6 }} />
                <Shimmer width="60%" height={14} />
            </>
        );
    };

    // Horizontal shimmer layout: [leftItem] [body center] [rightItem]
    // Adapts to actual content in the card
    if (isHorizontal) {
        return (
            <View style={[defaultStyles.shimmerCard, style]}>
                <View style={styles.shimmerHorizontalContent}>
                    {/* Left item shimmer - uses leftItemShape for shape matching */}
                    {hasLeftItem && <Shimmer width={leftItemWidth} height={leftItemHeight} contentShape={leftItemShape} />}

                    {/* Body center shimmer - adapts to title/subtitle/description */}
                    <View style={styles.shimmerHorizontalBody}>
                        {hasTitle && <Shimmer width={bodyTitleWidth} height={16} style={{ marginBottom: 8 }} />}
                        {hasSubtitle && <Shimmer width={bodySubtitleWidth} height={14} style={{ marginBottom: 6 }} />}
                        {/* Custom description shimmer for horizontal cards */}
                        {hasBodyDescription && renderDescriptionShimmer()}
                        {/* Show default text if no specific body props */}
                        {!hasTitle && !hasSubtitle && !hasBodyDescription && (
                            <>
                                <Shimmer width="70%" height={16} style={{ marginBottom: 8 }} />
                                <Shimmer width="50%" height={14} />
                            </>
                        )}
                    </View>

                    {/* Right item shimmer - uses rightItemShape for shape matching */}
                    {hasRightItem && <Shimmer width={rightItemWidth} height={rightItemHeight} contentShape={rightItemShape} />}
                </View>
            </View>
        );
    }

    // Description shimmer element for vertical cards
    const descriptionShimmer = hasDescription ? (
        <View style={contentType ? { marginTop: descriptionPosition === 'bottom' ? 12 : 0, marginBottom: descriptionPosition === 'top' ? 12 : 0 } : undefined}>
            {renderDescriptionShimmer()}
        </View>
    ) : null;

    // Text content shimmer (for text-type children)
    const textShimmer = (
        <>
            <Shimmer width="100%" height={16} style={{ marginBottom: 8 }} />
            <Shimmer width="100%" height={16} style={{ marginBottom: 8 }} />
            <Shimmer width="70%" height={16} />
        </>
    );

    // Image content shimmer (for image-type children)
    const imageShimmer = (
        <Shimmer width="100%" height={180} contentShape="rounded" />
    );

    // Mixed content shimmer (image + text)
    const mixedShimmer = (
        <>
            <Shimmer width="100%" height={150} contentShape="rounded" style={{ marginBottom: 12 }} />
            <Shimmer width="100%" height={14} style={{ marginBottom: 6 }} />
            <Shimmer width="80%" height={14} />
        </>
    );

    // Get appropriate children shimmer based on contentType or bodyShimmerItems
    const getChildrenShimmer = () => {
        // If custom body shimmer items are provided, use them
        if (bodyShimmerItems && bodyShimmerItems.length > 0) {
            return (
                <>
                    {bodyShimmerItems.map((item, index) => {
                        const { width, height } = getShimmerDimensions(item);
                        return (
                            <Shimmer
                                key={index}
                                width={width}
                                height={height}
                                contentShape={item.shape || 'rectangle'}
                                style={item.marginBottom ? { marginBottom: item.marginBottom } : undefined}
                            />
                        );
                    })}
                </>
            );
        }
        if (!contentType) return null;
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
            return (
                <>
                    {footerShimmerItems.map((item, index) => {
                        const { width, height } = getShimmerDimensions(item);
                        return (
                            <Shimmer
                                key={index}
                                width={width}
                                height={height}
                                contentShape={item.shape || 'rounded'}
                                style={item.marginBottom ? { marginBottom: item.marginBottom } : undefined}
                            />
                        );
                    })}
                </>
            );
        }
        // Default footer shimmer
        return (
            <>
                <Shimmer width={70} height={28} contentShape="rounded" />
                <Shimmer width={90} height={28} contentShape="rounded" />
            </>
        );
    };

    const childrenShimmer = getChildrenShimmer();

    return (
        <View style={[defaultStyles.shimmerCard, style]}>
            <View style={isHorizontal ? styles.shimmerHorizontal : styles.shimmerVertical}>
                {/* Header shimmer - only if header exists */}
                {showHeader && (
                    <View style={styles.shimmerHeader}>
                        {hasHeaderLeftItem && (
                            <Shimmer width={headerLeftItemWidth} height={headerLeftItemHeight} contentShape={headerLeftItemShape} />
                        )}
                        <View style={[styles.shimmerHeaderText, !hasHeaderLeftItem && { marginLeft: 0 }]}>
                            <Shimmer width={headerTitleWidth} height={18} style={{ marginBottom: 8 }} />
                            <Shimmer width={headerSubtitleWidth} height={14} />
                        </View>
                        {hasHeaderRightItem && (
                            <Shimmer width={headerRightItemWidth} height={headerRightItemHeight} contentShape={headerRightItemShape} />
                        )}
                    </View>
                )}

                {/* Header divider shimmer */}
                {showHeaderDivider && showHeader && (
                    <View style={styles.shimmerDivider}>
                        <Shimmer width="100%" height={1} />
                    </View>
                )}

                {/* Body shimmer - only if body exists */}
                {showBody && (
                    <View style={styles.shimmerBody}>
                        {/* Description at top if specified */}
                        {descriptionPosition === 'top' && descriptionShimmer}

                        {/* Children content shimmer based on contentType or bodyShimmerItems */}
                        {childrenShimmer}

                        {/* Description at bottom (default) */}
                        {descriptionPosition === 'bottom' && descriptionShimmer}

                        {/* Default body shimmer when no specific content and no description */}
                        {!hasDescription && !contentType && !bodyShimmerItems && textShimmer}
                    </View>
                )}

                {/* Footer divider shimmer */}
                {showFooterDivider && showFooter && (
                    <View style={styles.shimmerDivider}>
                        <Shimmer width="100%" height={1} />
                    </View>
                )}

                {/* Footer shimmer - only if footer exists */}
                {showFooter && (
                    <View style={styles.shimmerFooter}>
                        {getFooterShimmer()}
                    </View>
                )}
            </View>
        </View>
    );
};


/**
 * CustomCard - A comprehensive, customizable card component for React Native
 */
const CustomCard: React.FC<CustomCardProps> = ({
    header,
    body,
    footer,
    leftItem,
    rightItem,
    isLoading = false,
    animated = false,
    animationType = 'fade',
    animationDuration = 300,
    orientation = 'vertical',
    showHeaderDivider = false,
    showFooterDivider = false,
    dividerProps,
    style,
    backgroundColor = colors.background,
    borderRadius = defaultBorderRadius.lg,
    elevation = 3,
    padding = spacing.lg,
    margin,
    onPress,
    testID,
    gradient,
    GradientComponent,
    responsiveSize,
    leftItemShimmerShape = 'rounded',
    leftItemShimmerWidth = 80,
    leftItemShimmerHeight = 80,
    rightItemShimmerShape = 'rounded',
    rightItemShimmerWidth = 24,
    rightItemShimmerHeight = 24,
    bodyTitleShimmerWidth = '70%',
    bodySubtitleShimmerWidth = '50%',
    bodyDescriptionShimmerWidth = '90%',
    // Vertical card shimmer props
    headerLeftItemShimmerWidth = 44,
    headerLeftItemShimmerHeight = 44,
    headerLeftItemShimmerShape = 'circle',
    headerRightItemShimmerWidth = 24,
    headerRightItemShimmerHeight = 24,
    headerRightItemShimmerShape = 'rounded',
    headerTitleShimmerWidth = '70%',
    headerSubtitleShimmerWidth = '40%',
    bodyShimmerItems,
    footerShimmerItems,
    descriptionShimmerItems,
}) => {
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
    const gradientConfig = useMemo((): GradientConfig | null => {
        if (!gradient) return null;
        if (gradient === true) {
            return { enabled: true, ...DEFAULT_GRADIENT };
        }
        return gradient.enabled ? gradient : null;
    }, [gradient]);

    // Parse responsive size configuration
    const responsiveSizeConfig = useMemo((): ResponsiveSizeConfig | null => {
        if (!responsiveSize) return null;
        if (responsiveSize === true) {
            return { enabled: true, tabletBreakpoint: 768, maxWidth: 600 };
        }
        return responsiveSize.enabled !== false ? responsiveSize : null;
    }, [responsiveSize]);

    // Calculate responsive width
    const responsiveWidth = useMemo(() => {
        if (!responsiveSizeConfig) return undefined;
        const { minWidth, maxWidth, tabletBreakpoint = 768 } = responsiveSizeConfig;
        const isTablet = screenWidth >= tabletBreakpoint;
        let width: number | string = '100%';
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
        const bodyAsProps = body && typeof body === 'object' && ('children' in body || 'description' in body || 'title' in body) ? (body as any) : null;
        return (
            <ShimmerCard
                orientation={orientation}
                hasContent={hasContent}
                showHeader={Boolean(header)}
                hasHeaderLeftItem={Boolean(header?.leftItem)}
                hasHeaderRightItem={Boolean(header?.rightItem)}
                showBody={Boolean(body)}
                hasDescription={Boolean(bodyAsProps?.description)}
                contentType={bodyAsProps?.children ? (bodyAsProps.contentType || 'text') : undefined}
                descriptionPosition={bodyAsProps?.descriptionPosition || 'bottom'}
                showFooter={Boolean(footer)}
                showHeaderDivider={showHeaderDivider}
                showFooterDivider={showFooterDivider}
                // Horizontal-specific props for adaptive shimmer
                hasLeftItem={Boolean(leftItem)}
                hasRightItem={Boolean(rightItem)}
                leftItemShape={leftItemShimmerShape}
                leftItemWidth={leftItemShimmerWidth}
                leftItemHeight={leftItemShimmerHeight}
                rightItemShape={rightItemShimmerShape}
                rightItemWidth={rightItemShimmerWidth}
                rightItemHeight={rightItemShimmerHeight}
                hasTitle={Boolean(bodyAsProps?.title)}
                hasSubtitle={Boolean(bodyAsProps?.subtitle)}
                hasBodyDescription={Boolean(bodyAsProps?.description)}
                bodyTitleWidth={bodyTitleShimmerWidth}
                bodySubtitleWidth={bodySubtitleShimmerWidth}
                bodyDescriptionWidth={bodyDescriptionShimmerWidth}
                // Vertical-specific props for adaptive shimmer
                headerLeftItemWidth={headerLeftItemShimmerWidth}
                headerLeftItemHeight={headerLeftItemShimmerHeight}
                headerLeftItemShape={headerLeftItemShimmerShape}
                headerRightItemWidth={headerRightItemShimmerWidth}
                headerRightItemHeight={headerRightItemShimmerHeight}
                headerRightItemShape={headerRightItemShimmerShape}
                headerTitleWidth={headerTitleShimmerWidth}
                headerSubtitleWidth={headerSubtitleShimmerWidth}
                bodyShimmerItems={bodyShimmerItems}
                footerShimmerItems={footerShimmerItems}
                descriptionShimmerItems={descriptionShimmerItems}
                style={style}
            />
        );
    }

    const isHorizontal = orientation === 'horizontal';
    const animatedStyle = animated ? getAnimatedStyle(animatedValue, animationType) : {};

    // Determine divider orientation based on card orientation (can be overridden)
    const effectiveDividerOrientation = dividerProps?.orientation || (isHorizontal ? 'vertical' : 'horizontal');
    const effectiveDividerProps = {
        ...dividerProps,
        orientation: effectiveDividerOrientation as 'horizontal' | 'vertical',
    };

    // Build card styles
    const cardStyles: StyleProp<ViewStyle> = [
        defaultStyles.card,
        isHorizontal ? styles.cardHorizontalWrap : defaultStyles.cardVertical,
        {
            borderRadius,
            elevation,
            padding,
            ...(margin !== undefined && { margin }),
            ...(responsiveWidth !== undefined && {
                width: responsiveWidth,
                alignSelf: 'center' as const,
            }),
        },
        // Only apply background color if no gradient
        !gradientConfig && { backgroundColor },
        animatedStyle,
        style,
    ];

    // Card inner content - different for horizontal vs vertical
    const isHorizontalBodyProps = isHorizontal && body && typeof body === 'object' && ('title' in body || 'subtitle' in body || 'description' in body || 'children' in body);
    const hBody = isHorizontalBodyProps ? (body as any) : null;

    // Helper to render overlay items
    const renderOverlayItems = (items: any[] | undefined) => items?.map((item: any, index: number) => (
        <View
            key={index}
            style={[
                styles.overlay,
                getOverlayPositionStyle(item.position),
                item.offsetX !== undefined && { marginLeft: item.offsetX, marginRight: -item.offsetX },
                item.offsetY !== undefined && { marginTop: item.offsetY, marginBottom: -item.offsetY },
                item.style,
            ]}
        >
            {item.content}
        </View>
    ));

    const cardInnerContent = isHorizontal ? (
        <View style={styles.horizontalContent}>
            {leftItem && <View>{leftItem as React.ReactNode}</View>}
            <View style={[styles.horizontalBodyCenter, !hBody?.overlayOnChildrenOnly && hBody?.overlayItems && { position: 'relative' as const }]}>
                {hBody && (
                    <>
                        {hBody.title && <Text style={[styles.horizontalTitle, hBody.titleStyle]}>{hBody.title}</Text>}
                        {hBody.subtitle && <Text style={[styles.horizontalSubtitle, hBody.subtitleStyle]}>{hBody.subtitle}</Text>}
                        {hBody.description && <Text style={[styles.horizontalDescription, hBody.descriptionStyle]}>{hBody.description}</Text>}
                        {hBody.overlayOnChildrenOnly && hBody.children ? (
                            <View style={{ position: 'relative' }}>
                                {hBody.children}
                                {renderOverlayItems(hBody.overlayItems)}
                            </View>
                        ) : (
                            hBody.children
                        )}
                        {!hBody.overlayOnChildrenOnly && renderOverlayItems(hBody.overlayItems)}
                    </>
                )}
                {body && !hBody && (body as React.ReactNode)}
            </View>
            {rightItem && <View>{rightItem as React.ReactNode}</View>}
        </View>
    ) : (
        <>
            {header && <CardHeader {...header} />}
            {showHeaderDivider && header && <Divider {...effectiveDividerProps} />}
            {body && <CardBody {...(body as any)} />}
            {showFooterDivider && footer && <Divider {...effectiveDividerProps} />}
            {footer && <CardFooter {...footer} />}
        </>
    );

    // Build card content
    let cardContent: React.ReactNode;

    // Handle gradient background
    if (gradientConfig && GradientComponent) {
        const gradientColors = (gradientConfig.stops && gradientConfig.stops.length >= 2
            ? gradientConfig.stops
            : [gradientConfig.from, gradientConfig.to]) as unknown as readonly [string, string, ...string[]];
        const gradientPoints = getGradientPoints(gradientConfig.direction || 'diagonal');

        cardContent = (
            <Animated.View
                testID={testID}
                style={[...cardStyles.filter(s => s), { overflow: 'hidden' }] as StyleProp<ViewStyle>}
            >
                <GradientComponent
                    colors={gradientColors}
                    start={gradientPoints.start}
                    end={gradientPoints.end}
                    style={StyleSheet.absoluteFillObject}
                />
                {cardInnerContent}
            </Animated.View>
        );
    } else {
        // Fallback background color if gradient is requested but no component provided
        const fallbackBackground = gradientConfig ? gradientConfig.from : backgroundColor;

        cardContent = (
            <Animated.View
                testID={testID}
                style={[
                    ...cardStyles.filter(s => s),
                    { backgroundColor: fallbackBackground },
                ] as StyleProp<ViewStyle>}
            >
                {cardInnerContent}
            </Animated.View>
        );
    }

    // Wrap with TouchableOpacity if onPress is provided
    if (onPress) {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
                {cardContent}
            </TouchableOpacity>
        );
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
