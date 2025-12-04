import React, { useState, useCallback } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, LayoutAnimation, Platform, UIManager } from 'react-native';
import { ExpandableTextProps } from '../types';
import { colors, fontSize, spacing } from '../styles/defaultStyles';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * ExpandableText component - displays text with "View more/less" toggle
 * 
 * @example
 * ```tsx
 * <ExpandableText
 *   text="Long text content here..."
 *   maxLength={100}
 *   expandText="Show more"
 *   collapseText="Show less"
 * />
 * ```
 */
const ExpandableText: React.FC<ExpandableTextProps> = ({
    text,
    maxLength = 150,
    expandText = 'View more',
    collapseText = 'View less',
    textStyle,
    toggleStyle,
    style,
    onToggle,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const shouldTruncate = text.length > maxLength;
    const displayText = shouldTruncate && !isExpanded
        ? `${text.substring(0, maxLength).trim()}...`
        : text;

    const handleToggle = useCallback(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const newExpandedState = !isExpanded;
        setIsExpanded(newExpandedState);
        onToggle?.(newExpandedState);
    }, [isExpanded, onToggle]);

    return (
        <View style={[styles.container, style]}>
            <Text style={[styles.text, textStyle]}>
                {displayText}
            </Text>
            {shouldTruncate && (
                <TouchableOpacity onPress={handleToggle} activeOpacity={0.7}>
                    <Text style={[styles.toggle, toggleStyle]}>
                        {isExpanded ? collapseText : expandText}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    text: {
        fontSize: fontSize.md,
        color: colors.text,
        lineHeight: fontSize.md * 1.5,
    },
    toggle: {
        fontSize: fontSize.sm,
        color: '#007AFF',
        marginTop: spacing.xs,
        fontWeight: '500',
    },
});

export default ExpandableText;
