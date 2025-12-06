import React from 'react';
import { ShimmerProps } from '../types';
/**
 * Shimmer component that displays an animated loading effect
 *
 * @example
 * ```tsx
 * // Basic shimmer (left-to-right, default)
 * <Shimmer width={200} height={20} borderRadius={4} />
 *
 * // Right-to-left shimmer
 * <Shimmer width={200} height={20} direction="right-to-left" />
 *
 * // Top-to-bottom shimmer
 * <Shimmer width={100} height={100} direction="top-to-bottom" />
 *
 * // Circular shimmer (e.g., for avatars)
 * <Shimmer width={50} height={50} contentShape="circle" />
 * ```
 */
declare const Shimmer: React.FC<ShimmerProps>;
export default Shimmer;
//# sourceMappingURL=Shimmer.d.ts.map