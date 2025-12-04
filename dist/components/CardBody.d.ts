import React from 'react';
import { CardBodyProps } from '../types';
/**
 * CardBody component - flexible content area with optional left/right items
 *
 * @example
 * ```tsx
 * <CardBody
 *   description="Long description text here..."  // String format
 *   // OR object format with full config:
 *   description={{ text: "Long text...", maxLength: 100, expandText: "More" }}
 *   borderRadius={12}
 *   backgroundColor="#f0f0f0"
 *   overlayItems={[
 *     { content: <HeartIcon />, position: 'top-right' },
 *     { content: <Badge>-20%</Badge>, position: 'top-left' }
 *   ]}
 * >
 *   <Image source={...} />
 * </CardBody>
 * ```
 */
declare const CardBody: React.FC<CardBodyProps>;
export default CardBody;
//# sourceMappingURL=CardBody.d.ts.map