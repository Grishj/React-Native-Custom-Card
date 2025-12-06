import { ViewStyle, TextStyle, StyleProp } from 'react-native';
import { ReactNode, ComponentType } from 'react';
/**
 * Animation types available for card transitions
 */
export type AnimationType = 'fade' | 'scale' | 'slide' | 'none';
/**
 * Card orientation - horizontal or vertical layout
 */
export type CardOrientation = 'horizontal' | 'vertical';
/**
 * Divider orientation type
 */
export type DividerOrientation = 'horizontal' | 'vertical';
/**
 * Gradient direction options
 */
export type GradientDirection = 'to-right' | 'to-left' | 'to-top' | 'to-bottom' | 'diagonal';
/**
 * Shimmer content shape options
 */
export type ShimmerShape = 'rectangle' | 'circle' | 'rounded';
/** Direction of shimmer animation effect */
export type ShimmerDirection = 'left-to-right' | 'right-to-left' | 'top-to-bottom' | 'bottom-to-top';
/**
 * Gradient configuration options
 */
export interface GradientConfig {
    /** Enable gradient effect */
    enabled: boolean;
    /** Start color of gradient */
    from: string;
    /** End color of gradient */
    to: string;
    /** Gradient direction/angle */
    direction?: GradientDirection;
    /** Optional additional color stops */
    stops?: string[];
}
/**
 * Responsive size configuration
 */
export interface ResponsiveSizeConfig {
    /** Enable responsive sizing based on screen dimensions */
    enabled?: boolean;
    /** Minimum width in pixels or percentage */
    minWidth?: number | string;
    /** Maximum width in pixels or percentage */
    maxWidth?: number | string;
    /** Breakpoint for tablet sizing (default: 768) */
    tabletBreakpoint?: number;
}
/**
 * Props for the ExpandableText component
 */
export interface ExpandableTextProps {
    /** The text content to display */
    text: string;
    /** Maximum characters before truncation (default: 150) */
    maxLength?: number;
    /** Text for expand action (default: "View more") */
    expandText?: string;
    /** Text for collapse action (default: "View less") */
    collapseText?: string;
    /** Custom style for the text */
    textStyle?: StyleProp<TextStyle>;
    /** Custom style for the toggle button */
    toggleStyle?: StyleProp<TextStyle>;
    /** Custom style for the container */
    style?: StyleProp<ViewStyle>;
    /** Callback when expanded state changes */
    onToggle?: (expanded: boolean) => void;
}
/**
 * Description configuration object for flexible description handling
 * @example
 * description={{ text: "Long text...", maxLength: 100, expandText: "More", collapseText: "Less" }}
 */
export interface DescriptionConfig {
    /** The description text content */
    text: string;
    /** Maximum characters before truncation (default: 150) */
    maxLength?: number;
    /** Text for expand action (default: "View more") */
    expandText?: string;
    /** Text for collapse action (default: "View less") */
    /** Text for collapse action (default: "View less") */
    collapseText?: string;
    /** Custom style for the toggle button ("View more"/"View less") */
    toggleStyle?: StyleProp<TextStyle>;
}
/**
 * Overlay item position options
 */
export type OverlayPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
/**
 * Configuration for overlay items in card body
 * @example
 * overlayItems={[{ content: <HeartIcon />, position: 'top-right' }]}
 */
export interface OverlayItemConfig {
    /** Content to overlay (icon, badge, banner, etc.) */
    content: ReactNode;
    /** Position of the overlay (default: 'top-right') */
    position?: OverlayPosition;
    /** Horizontal offset from positioned edge */
    offsetX?: number;
    /** Vertical offset from positioned edge */
    offsetY?: number;
    /** Custom style for the overlay container */
    style?: StyleProp<ViewStyle>;
}
/**
 * Props for the CardHeader component
 */
export interface CardHeaderProps {
    /** Main title text */
    title?: string;
    /** Optional subtitle text */
    subtitle?: string;
    /** Optional component to render on the left side */
    leftItem?: ReactNode;
    /** Show vertical divider between leftItem and title */
    showLeftDivider?: boolean;
    /** Custom props for the left divider */
    leftDividerProps?: Omit<DividerProps, 'orientation'>;
    /** Optional component to render on the right side */
    rightItem?: ReactNode;
    /** Custom style for the header container */
    style?: StyleProp<ViewStyle>;
    /** Custom style for the title text */
    titleStyle?: StyleProp<TextStyle>;
    /** Custom style for the subtitle text */
    subtitleStyle?: StyleProp<TextStyle>;
}
/**
 * Props for the CardBody component
 */
export interface CardBodyProps {
    /** Main title text (primarily used for horizontal cards) */
    title?: string;
    /** Optional subtitle text (primarily used for horizontal cards) */
    subtitle?: string;
    /** Custom style for the title text */
    titleStyle?: StyleProp<TextStyle>;
    /** Custom style for the subtitle text */
    subtitleStyle?: StyleProp<TextStyle>;
    /** Content to display in the body */
    children?: ReactNode;
    /** Type of children content for shimmer representation: 'text', 'image', 'mixed' (default: 'text') */
    contentType?: 'text' | 'image' | 'mixed';
    /** Optional description - can be string or object with expandable config */
    description?: string | DescriptionConfig;
    /** Maximum characters before showing "View more" (default: 150) - used when description is a string */
    maxDescriptionLength?: number;
    /** Text for expand action (default: "View more") - used when description is a string */
    expandText?: string;
    /** Text for collapse action (default: "View less") - used when description is a string */
    collapseText?: string;
    /** Position of description relative to children: 'top' or 'bottom' (default: 'bottom') */
    descriptionPosition?: 'top' | 'bottom';
    /** Optional component to render on the left side */
    leftItem?: ReactNode;
    /** Optional component to render on the right side */
    rightItem?: ReactNode;
    /** Border radius for the body container */
    borderRadius?: number;
    /** Background color for the body container */
    backgroundColor?: string;
    /** Items to overlay on top of body content (icons, badges, banners) */
    overlayItems?: OverlayItemConfig[];
    /** If true, overlays are positioned relative to children only (e.g., image), not the entire body including description */
    overlayOnChildrenOnly?: boolean;
    /** Custom style for the body container */
    style?: StyleProp<ViewStyle>;
    /** Custom style for the description text */
    descriptionStyle?: StyleProp<TextStyle>;
    /** Custom style for the description toggle button */
    descriptionToggleStyle?: StyleProp<TextStyle>;
    /** Callback when description expanded state changes */
    onDescriptionToggle?: (expanded: boolean) => void;
}
/**
 * Props for the CardFooter component
 */
export interface CardFooterProps {
    /** Content to display in the footer (buttons, links, etc.) */
    children?: ReactNode;
    /** Optional component to render on the left side */
    leftItem?: ReactNode;
    /** Optional component to render on the right side */
    rightItem?: ReactNode;
    /** Custom style for the footer container */
    style?: StyleProp<ViewStyle>;
}
/**
 * Props for horizontal card body layout
 */
export interface HorizontalBodyProps {
    title?: string;
    subtitle?: string;
    description?: string | DescriptionConfig;
    children?: ReactNode;
    titleStyle?: StyleProp<TextStyle>;
    subtitleStyle?: StyleProp<TextStyle>;
    descriptionStyle?: StyleProp<TextStyle>;
    /** Custom style for the description toggle button */
    descriptionToggleStyle?: StyleProp<TextStyle>;
    overlayItems?: OverlayItemConfig[];
    overlayOnChildrenOnly?: boolean;
    /** Maximum characters before truncation (default: 150) - used when description is a string */
    maxDescriptionLength?: number;
    /** Text for expand action (default: "View more") - used when description is a string */
    expandText?: string;
    /** Text for collapse action (default: "View less") - used when description is a string */
    collapseText?: string;
}
/**
 * Props for the Divider component
 */
export interface DividerProps {
    /** Orientation of the divider (default: 'horizontal') */
    orientation?: DividerOrientation;
    /** Color of the divider line */
    color?: string;
    /** Thickness of the divider line */
    thickness?: number;
    /** Length of the divider (width for horizontal, height for vertical) */
    length?: number | string;
    /** Horizontal margin of the divider */
    marginHorizontal?: number;
    /** Vertical margin of the divider */
    marginVertical?: number;
    /** Custom style for the divider */
    style?: StyleProp<ViewStyle>;
}
/**
 * Configuration for a single shimmer item (for multiple children shimmers)
 * @example
 * // Manual sizing
 * shimmerItems={[{ width: '100%', height: 200, shape: 'rounded' }]}
 *
 * // Auto-sizing based on text content
 * shimmerItems={[{ text: 'Product Name', fontSize: 16 }]}
 */
export interface ShimmerItemConfig {
    /** Width of the shimmer (number in pixels or percentage string). If 'text' is provided, width is auto-calculated. */
    width?: number | string;
    /** Height of the shimmer in pixels. If 'text' is provided with fontSize, height defaults to fontSize + 4. */
    height?: number;
    /** Shape of the shimmer */
    shape?: ShimmerShape;
    /** Optional margin bottom for spacing */
    marginBottom?: number;
    /** Text content to auto-calculate width from (uses approximate character width) */
    text?: string;
    /** Font size to use for calculating text dimensions (default: 14) */
    fontSize?: number;
    /** Maximum width in pixels. Auto-calculated text width will be capped at this value. If not set, defaults to 100% when text is too long. */
    maxWidth?: number;
}
/**
 * Detailed configuration for a single shimmer element
 */
export interface ShimmerElementConfig {
    /** Shape of the shimmer element */
    shape?: ShimmerShape;
    /** Width of the shimmer (number, string percentage) */
    width?: number | string;
    /** Height of the shimmer (number) */
    height?: number;
    /** Margin bottom for spacing */
    marginBottom?: number;
    /** Margin top for spacing */
    marginTop?: number;
    /** Margin left for spacing */
    marginLeft?: number;
    /** Margin right for spacing */
    marginRight?: number;
    /** Vertical margin */
    marginVertical?: number;
    /** Horizontal margin */
    marginHorizontal?: number;
    /** Specific border radius (overrides shape-based default) */
    borderRadius?: number;
    /** Custom style object for advanced styling (padding, etc.) */
    style?: StyleProp<ViewStyle>;
}
/**
 * Configuration for header shimmer elements
 */
export interface HeaderShimmerConfig {
    leftItem?: ShimmerElementConfig;
    title?: ShimmerElementConfig;
    subtitle?: ShimmerElementConfig;
    rightItem?: ShimmerElementConfig;
}
/**
 * Configuration for body shimmer elements
 */
export interface BodyShimmerConfig {
    title?: ShimmerElementConfig;
    subtitle?: ShimmerElementConfig;
    description?: ShimmerElementConfig;
    /** Array of shimmer items to represent children content */
    children?: ShimmerElementConfig[];
}
/**
 * Configuration for footer shimmer elements
 */
export interface FooterShimmerConfig {
    leftItem?: ShimmerElementConfig;
    title?: ShimmerElementConfig;
    subtitle?: ShimmerElementConfig;
    rightItem?: ShimmerElementConfig;
    /** Array of shimmer items to represent footer content */
    children?: ShimmerElementConfig[];
}
/**
 * Props for the Shimmer component
 */
export interface ShimmerProps {
    /** Width of the shimmer effect */
    width?: number | string;
    /** Height of the shimmer effect */
    height?: number;
    /** Border radius of the shimmer */
    borderRadius?: number;
    /** Background color of the shimmer */
    backgroundColor?: string;
    /** Highlight color of the shimmer animation */
    highlightColor?: string;
    /** Duration of one shimmer animation cycle in milliseconds */
    duration?: number;
    /** Whether to adapt size based on content/parent */
    adaptToContent?: boolean;
    /** Shape of the shimmer effect */
    contentShape?: ShimmerShape;
    /** Direction of shimmer animation (default: 'left-to-right') */
    direction?: ShimmerDirection;
    /** Custom style for the shimmer container */
    style?: StyleProp<ViewStyle>;
}
/**
 * Props for the ShimmerCard component (loading state)
 */
export interface ShimmerCardProps {
    /** Card orientation */
    orientation?: CardOrientation;
    /** Whether the card has content (affects shimmer layout) */
    hasContent?: boolean;
    /** Whether to show header shimmer */
    showHeader?: boolean;
    /** Whether header has a left item (avatar) */
    hasHeaderLeftItem?: boolean;
    /** Whether header has a right item */
    hasHeaderRightItem?: boolean;
    /** Whether to show body shimmer */
    showBody?: boolean;
    /** Whether body has description text */
    hasDescription?: boolean;
    /** Type of body children content: 'text', 'image', 'mixed', or undefined for no children */
    contentType?: 'text' | 'image' | 'mixed';
    /** Position of description in body: 'top' or 'bottom' */
    descriptionPosition?: 'top' | 'bottom';
    /** Whether to show footer shimmer */
    showFooter?: boolean;
    /** Whether to show header divider shimmer */
    showHeaderDivider?: boolean;
    /** Whether to show footer divider shimmer */
    showFooterDivider?: boolean;
    /** Custom style for the shimmer card */
    style?: StyleProp<ViewStyle>;
    /** [Horizontal] Whether card has leftItem */
    hasLeftItem?: boolean;
    /** [Horizontal] Whether card has rightItem */
    hasRightItem?: boolean;
    /** [Horizontal] Shape of leftItem shimmer */
    leftItemShape?: ShimmerShape;
    /** [Horizontal] Width of leftItem shimmer */
    leftItemWidth?: number;
    /** [Horizontal] Height of leftItem shimmer */
    leftItemHeight?: number;
    /** [Horizontal] Shape of rightItem shimmer */
    rightItemShape?: ShimmerShape;
    /** [Horizontal] Width of rightItem shimmer */
    rightItemWidth?: number;
    /** [Horizontal] Height of rightItem shimmer */
    rightItemHeight?: number;
    /** [Horizontal] Whether body has title */
    hasTitle?: boolean;
    /** [Horizontal] Whether body has subtitle */
    hasSubtitle?: boolean;
    /** [Horizontal] Whether body has description */
    hasBodyDescription?: boolean;
    /** [Horizontal] Width of body title shimmer */
    bodyTitleWidth?: number | string;
    /** [Horizontal] Width of body subtitle shimmer */
    bodySubtitleWidth?: number | string;
    /** [Horizontal] Width of body description shimmer */
    bodyDescriptionWidth?: number | string;
    /** [Horizontal] Custom shimmer items for body text (overrides hasTitle/hasSubtitle/hasBodyDescription) */
    bodyTextShimmerItems?: ShimmerItemConfig[];
    /** [Vertical] Width of header left item shimmer */
    headerLeftItemWidth?: number;
    /** [Vertical] Height of header left item shimmer */
    headerLeftItemHeight?: number;
    /** [Vertical] Shape of header left item shimmer */
    headerLeftItemShape?: ShimmerShape;
    /** [Vertical] Width of header right item shimmer */
    headerRightItemWidth?: number;
    /** [Vertical] Height of header right item shimmer */
    headerRightItemHeight?: number;
    /** [Vertical] Shape of header right item shimmer */
    headerRightItemShape?: ShimmerShape;
    /** [Vertical] Width of header title shimmer */
    headerTitleWidth?: number | string;
    /** [Vertical] Width of header subtitle shimmer */
    headerSubtitleWidth?: number | string;
    /** [Vertical] Custom shimmer items for body children (overrides contentType) */
    bodyShimmerItems?: ShimmerItemConfig[];
    /** [Vertical] Custom shimmer items for footer */
    footerShimmerItems?: ShimmerItemConfig[];
    /** Custom shimmer items for description (works for both horizontal and vertical cards) */
    descriptionShimmerItems?: ShimmerItemConfig[];
    /** Direction of shimmer animation (default: 'left-to-right') */
    shimmerDirection?: ShimmerDirection;
    /** Granular configuration for header shimmer elements */
    headerShimmerItem?: HeaderShimmerConfig;
    /** Granular configuration for body shimmer elements */
    bodyShimmerItem?: BodyShimmerConfig;
    /** Granular configuration for footer shimmer elements */
    footerShimmerItem?: FooterShimmerConfig;
}
/**
 * Gradient component props (for external gradient libraries)
 * Made flexible to accommodate different gradient library implementations
 */
export interface GradientComponentProps {
    colors: readonly [string | number, string | number, ...(string | number)[]];
    start?: {
        x: number;
        y: number;
    } | readonly [number, number] | null;
    end?: {
        x: number;
        y: number;
    } | readonly [number, number] | null;
    locations?: readonly number[] | null;
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
    [key: string]: unknown;
}
/**
 * Base props shared by both horizontal and vertical card orientations
 */
export interface CustomCardBaseProps {
    /** Body content - can be any ReactNode */
    body?: CardBodyProps;
    /** Show shimmer loading state */
    isLoading?: boolean;
    /** Enable/disable animations */
    animated?: boolean;
    /** Type of animation to use */
    animationType?: AnimationType;
    /** Animation duration in milliseconds */
    animationDuration?: number;
    /** Divider configuration */
    dividerProps?: DividerProps;
    /** Custom style for the card container */
    style?: StyleProp<ViewStyle>;
    /** Background color of the card */
    backgroundColor?: string;
    /** Border radius of the card */
    borderRadius?: number;
    /** Shadow/elevation for the card */
    elevation?: number;
    /** Padding inside the card */
    padding?: number;
    /** Margin around the card */
    margin?: number;
    /** Called when card is pressed */
    onPress?: () => void;
    /** Test ID for testing purposes */
    testID?: string;
    /** Gradient configuration */
    gradient?: GradientConfig | boolean;
    /** Custom gradient component (e.g., LinearGradient from expo-linear-gradient) */
    GradientComponent?: ComponentType<GradientComponentProps>;
    /** Responsive size configuration */
    responsiveSize?: ResponsiveSizeConfig | boolean;
    /** Custom shimmer items for description (works for both horizontal and vertical cards) */
    descriptionShimmerItems?: ShimmerItemConfig[];
    /** Direction of shimmer animation (default: 'left-to-right') */
    shimmerDirection?: ShimmerDirection;
    /** Granular configuration for header shimmer elements */
    headerShimmerItem?: HeaderShimmerConfig;
    /** Granular configuration for body shimmer elements */
    bodyShimmerItem?: BodyShimmerConfig;
    /** Granular configuration for footer shimmer elements */
    footerShimmerItem?: FooterShimmerConfig;
}
/**
 * Props specific to horizontal card orientation
 */
export interface HorizontalCardProps extends CustomCardBaseProps {
    /** Card layout orientation - horizontal */
    orientation: 'horizontal';
    /** Left item for horizontal cards (image, icon, etc.) */
    leftItem?: ReactNode;
    /** Right item for horizontal cards (icon, button, etc.) */
    rightItem?: ReactNode;
    /** Shimmer shape for leftItem */
    leftItemShimmerShape?: ShimmerShape;
    /** Shimmer width for leftItem */
    leftItemShimmerWidth?: number;
    /** Shimmer height for leftItem */
    leftItemShimmerHeight?: number;
    /** Shimmer shape for rightItem */
    rightItemShimmerShape?: ShimmerShape;
    /** Shimmer width for rightItem */
    rightItemShimmerWidth?: number;
    /** Shimmer height for rightItem */
    rightItemShimmerHeight?: number;
    /** Width of body title shimmer */
    bodyTitleShimmerWidth?: number | string;
    /** Width of body subtitle shimmer */
    bodySubtitleShimmerWidth?: number | string;
    /** Width of body description shimmer */
    bodyDescriptionShimmerWidth?: number | string;
    /** Custom shimmer items for body text (array of shimmer configs) */
    bodyTextShimmerItems?: ShimmerItemConfig[];
}
/**
 * Props specific to vertical card orientation (default)
 */
export interface VerticalCardProps extends CustomCardBaseProps {
    /** Card layout orientation - vertical (default, can be omitted) */
    orientation?: 'vertical';
    /** Header configuration - pass title/subtitle or header props object */
    header?: CardHeaderProps;
    /** Footer configuration */
    footer?: CardFooterProps;
    /** Show divider between header and body */
    showHeaderDivider?: boolean;
    /** Show divider between body and footer */
    showFooterDivider?: boolean;
    /** Width of header left item shimmer */
    headerLeftItemShimmerWidth?: number;
    /** Height of header left item shimmer */
    headerLeftItemShimmerHeight?: number;
    /** Shape of header left item shimmer */
    headerLeftItemShimmerShape?: ShimmerShape;
    /** Width of header right item shimmer */
    headerRightItemShimmerWidth?: number;
    /** Height of header right item shimmer */
    headerRightItemShimmerHeight?: number;
    /** Shape of header right item shimmer */
    headerRightItemShimmerShape?: ShimmerShape;
    /** Width of header title shimmer */
    headerTitleShimmerWidth?: number | string;
    /** Width of header subtitle shimmer */
    headerSubtitleShimmerWidth?: number | string;
    /** Custom shimmer items for body children (overrides contentType) */
    bodyShimmerItems?: ShimmerItemConfig[];
    /** Custom shimmer items for footer */
    footerShimmerItems?: ShimmerItemConfig[];
}
/**
 * Props for the main CustomCard component - discriminated union based on orientation
 *
 * @example
 * // Vertical card (default) - shows header, footer, vertical shimmer props
 * <CustomCard header={{ title: "Title" }} footer={{ children: <Button /> }} />
 *
 * @example
 * // Horizontal card - shows leftItem, rightItem, horizontal shimmer props
 * <CustomCard orientation="horizontal" leftItem={<Image />} rightItem={<Icon />} />
 */
export type CustomCardProps = HorizontalCardProps | VerticalCardProps;
/**
 * Internal type combining all props from both orientations.
 * Used internally by the CustomCard component implementation.
 * External consumers should use CustomCardProps (the discriminated union) for better type safety.
 */
export type CustomCardPropsInternal = CustomCardBaseProps & {
    /** Card layout orientation */
    orientation?: CardOrientation;
    /** Left item for horizontal cards */
    leftItem?: ReactNode;
    /** Right item for horizontal cards */
    rightItem?: ReactNode;
    leftItemShimmerShape?: ShimmerShape;
    leftItemShimmerWidth?: number;
    leftItemShimmerHeight?: number;
    rightItemShimmerShape?: ShimmerShape;
    rightItemShimmerWidth?: number;
    rightItemShimmerHeight?: number;
    bodyTitleShimmerWidth?: number | string;
    bodySubtitleShimmerWidth?: number | string;
    bodyDescriptionShimmerWidth?: number | string;
    bodyTextShimmerItems?: ShimmerItemConfig[];
    header?: CardHeaderProps;
    footer?: CardFooterProps;
    showHeaderDivider?: boolean;
    showFooterDivider?: boolean;
    headerLeftItemShimmerWidth?: number;
    headerLeftItemShimmerHeight?: number;
    headerLeftItemShimmerShape?: ShimmerShape;
    headerRightItemShimmerWidth?: number;
    headerRightItemShimmerHeight?: number;
    headerRightItemShimmerShape?: ShimmerShape;
    headerTitleShimmerWidth?: number | string;
    headerSubtitleShimmerWidth?: number | string;
    bodyShimmerItems?: ShimmerItemConfig[];
    footerShimmerItems?: ShimmerItemConfig[];
    headerShimmerItem?: HeaderShimmerConfig;
    bodyShimmerItem?: BodyShimmerConfig;
    footerShimmerItem?: FooterShimmerConfig;
};
//# sourceMappingURL=index.d.ts.map