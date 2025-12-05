// Main component
export { default as CustomCard } from './components/CustomCard';

// Individual components for advanced usage
export { default as CardHeader } from './components/CardHeader';
export { default as CardBody } from './components/CardBody';
export { default as CardFooter } from './components/CardFooter';
export { default as Divider } from './components/Divider';
export { default as Shimmer } from './components/Shimmer';
export { default as ExpandableText } from './components/ExpandableText';

// Types
export type {
    CustomCardProps,
    CardHeaderProps,
    CardBodyProps,
    CardFooterProps,
    DividerProps,
    ShimmerProps,
    ShimmerCardProps,
    AnimationType,
    CardOrientation,
    DividerOrientation,
    GradientConfig,
    GradientDirection,
    GradientComponentProps,
    ResponsiveSizeConfig,
    ExpandableTextProps,
    ShimmerShape,
    // New types for enhancements
    DescriptionConfig,
    OverlayPosition,
    OverlayItemConfig,
    HorizontalBodyProps,
} from './types';

// Styles (for advanced customization)
export { defaultStyles, colors, spacing, borderRadius, fontSize } from './styles/defaultStyles';

