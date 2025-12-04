import { Animated } from 'react-native';
import { AnimationType } from '../types';
/**
 * Create animation configuration based on type
 */
export declare const createAnimation: (animatedValue: Animated.Value, type: AnimationType, duration?: number, toValue?: number) => Animated.CompositeAnimation | null;
/**
 * Get animated style based on animation type
 */
export declare const getAnimatedStyle: (animatedValue: Animated.Value, type: AnimationType) => Animated.WithAnimatedValue<object>;
/**
 * Create shimmer animation for loading effect
 */
export declare const createShimmerAnimation: (animatedValue: Animated.Value, duration?: number) => Animated.CompositeAnimation;
//# sourceMappingURL=animations.d.ts.map