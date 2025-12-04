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
 * Props for the CardHeader component
 */
export interface CardHeaderProps {
    /** Main title text */
    title?: string;
    /** Optional subtitle text */
    subtitle?: string;
    /** Optional component to render on the left side */
    leftItem?: ReactNode;
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
    /** Content to display in the body */
    children?: ReactNode;
    /** Type of children content for shimmer representation: 'text', 'image', 'mixed' (default: 'text') */
    contentType?: 'text' | 'image' | 'mixed';
    /** Optional description text with expandable feature */
    description?: string;
    /** Maximum characters before showing "View more" (default: 150) */
    maxDescriptionLength?: number;
    /** Text for expand action (default: "View more") */
    expandText?: string;
    /** Text for collapse action (default: "View less") */
    collapseText?: string;
    /** Position of description relative to children: 'top' or 'bottom' (default: 'bottom') */
    descriptionPosition?: 'top' | 'bottom';
    /** Optional component to render on the left side */
    leftItem?: ReactNode;
    /** Optional component to render on the right side */
    rightItem?: ReactNode;
    /** Custom style for the body container */
    style?: StyleProp<ViewStyle>;
    /** Custom style for the description text */
    descriptionStyle?: StyleProp<TextStyle>;
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
}

/**
 * Gradient component props (for external gradient libraries)
 * Made flexible to accommodate different gradient library implementations
 */
export interface GradientComponentProps {
    colors: readonly [string | number, string | number, ...(string | number)[]];
    start?: { x: number; y: number } | readonly [number, number] | null;
    end?: { x: number; y: number } | readonly [number, number] | null;
    locations?: readonly number[] | null;
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
    [key: string]: unknown; // Allow additional props
}

/**
 * Props for the main CustomCard component
 */
export interface CustomCardProps {
    /** Header configuration - pass title/subtitle or header props object */
    header?: CardHeaderProps;
    /** Body content - can be any ReactNode */
    body?: CardBodyProps;
    /** Footer configuration */
    footer?: CardFooterProps;
    /** Show shimmer loading state */
    isLoading?: boolean;
    /** Enable/disable animations */
    animated?: boolean;
    /** Type of animation to use */
    animationType?: AnimationType;
    /** Animation duration in milliseconds */
    animationDuration?: number;
    /** Card layout orientation */
    orientation?: CardOrientation;
    /** Show divider between header and body */
    showHeaderDivider?: boolean;
    /** Show divider between body and footer */
    showFooterDivider?: boolean;
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
}

