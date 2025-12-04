import { StyleSheet } from 'react-native';
/**
 * Default color palette for the CustomCard component
 */
export const colors = {
    background: '#FFFFFF',
    text: '#1A1A1A',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    divider: '#E5E7EB',
    shimmerBackground: '#E5E7EB',
    shimmerHighlight: '#F3F4F6',
    shadow: '#000000',
};
/**
 * Default spacing values
 */
export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
};
/**
 * Default border radius values
 */
export const borderRadius = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
};
/**
 * Default font sizes
 */
export const fontSize = {
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
};
/**
 * Default styles for all CustomCard components
 */
export const defaultStyles = StyleSheet.create({
    // Card container
    card: {
        backgroundColor: colors.background,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        marginVertical: spacing.sm,
        marginHorizontal: spacing.md,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    // Horizontal card layout
    cardHorizontal: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    // Vertical card layout (default)
    cardVertical: {
        flexDirection: 'column',
    },
    // Header styles
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    headerContent: {
        flex: 1,
        marginHorizontal: spacing.sm,
    },
    headerTitle: {
        fontSize: fontSize.xl,
        fontWeight: '600',
        color: colors.text,
    },
    headerSubtitle: {
        fontSize: fontSize.md,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    // Body styles
    body: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    bodyContent: {
        flex: 1,
        marginHorizontal: spacing.sm,
    },
    // Footer styles
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.md,
    },
    footerContent: {
        flex: 1,
        marginHorizontal: spacing.sm,
    },
    // Divider styles
    divider: {
        height: 1,
        backgroundColor: colors.divider,
        marginVertical: spacing.md,
        marginHorizontal: 0,
    },
    // Shimmer styles
    shimmer: {
        backgroundColor: colors.shimmerBackground,
        overflow: 'hidden',
    },
    shimmerCard: {
        backgroundColor: colors.background,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        marginVertical: spacing.sm,
        marginHorizontal: spacing.md,
    },
    shimmerLine: {
        height: 16,
        borderRadius: borderRadius.sm,
        marginBottom: spacing.sm,
    },
    shimmerTitle: {
        width: '60%',
        height: 20,
    },
    shimmerSubtitle: {
        width: '40%',
        height: 14,
    },
    shimmerBody: {
        width: '100%',
        height: 60,
    },
    shimmerFooter: {
        width: '30%',
        height: 32,
    },
});
export default defaultStyles;
//# sourceMappingURL=defaultStyles.js.map