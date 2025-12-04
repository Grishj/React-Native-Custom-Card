import { Animated, Easing } from 'react-native';
import { AnimationType } from '../types';

/**
 * Create animation configuration based on type
 */
export const createAnimation = (
    animatedValue: Animated.Value,
    type: AnimationType,
    duration: number = 300,
    toValue: number = 1
): Animated.CompositeAnimation | null => {
    if (type === 'none') {
        return null;
    }

    return Animated.timing(animatedValue, {
        toValue,
        duration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
    });
};

/**
 * Get animated style based on animation type
 */
export const getAnimatedStyle = (
    animatedValue: Animated.Value,
    type: AnimationType
): Animated.WithAnimatedValue<object> => {
    switch (type) {
        case 'fade':
            return {
                opacity: animatedValue,
            };

        case 'scale':
            return {
                opacity: animatedValue,
                transform: [
                    {
                        scale: animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.9, 1],
                        }),
                    },
                ],
            };

        case 'slide':
            return {
                opacity: animatedValue,
                transform: [
                    {
                        translateY: animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [20, 0],
                        }),
                    },
                ],
            };

        case 'none':
        default:
            return {};
    }
};

/**
 * Create shimmer animation for loading effect
 */
export const createShimmerAnimation = (
    animatedValue: Animated.Value,
    duration: number = 1500
): Animated.CompositeAnimation => {
    return Animated.loop(
        Animated.timing(animatedValue, {
            toValue: 1,
            duration,
            easing: Easing.linear,
            useNativeDriver: true,
        })
    );
};
