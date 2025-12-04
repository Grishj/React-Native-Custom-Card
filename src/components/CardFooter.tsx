import React from 'react';
import { View } from 'react-native';
import { CardFooterProps } from '../types';
import { defaultStyles } from '../styles/defaultStyles';

/**
 * CardFooter component for actions, buttons, or additional information
 * 
 * @example
 * ```tsx
 * <CardFooter
 *   leftItem={<Text>Posted 2h ago</Text>}
 *   rightItem={<Button title="View More" />}
 * >
 *   <View style={{ flexDirection: 'row' }}>
 *     <Button title="Like" />
 *     <Button title="Share" />
 *   </View>
 * </CardFooter>
 * ```
 */
const CardFooter: React.FC<CardFooterProps> = ({
    children,
    leftItem,
    rightItem,
    style,
}) => {
    return (
        <View style={[defaultStyles.footer, style]}>
            {leftItem && <View>{leftItem}</View>}

            <View style={defaultStyles.footerContent}>
                {children}
            </View>

            {rightItem && <View>{rightItem}</View>}
        </View>
    );
};

export default CardFooter;
