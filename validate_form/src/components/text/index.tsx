import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {CommonTextProps} from './type';
import {styles} from './style';

const CommonText: React.FC<CommonTextProps> =
    ({
         title,
         variant = 'h4',
         style,
         ...rest
     }) => {
        const defaultTitleStyle: StyleProp<TextStyle> = [
            styles.defaultFont,
            variant === 'h1' && styles.h1,
            variant === 'h2' && styles.h2,
            variant === 'h3' && styles.h3,
            variant === 'h4' && styles.h4,
            variant === 'h5' && styles.h5,
            variant === 'h6' && styles.h6,
            variant === 'small' && styles.small,
        ];

        return (
            <Text  {...rest} style={[defaultTitleStyle, style]}>{title}</Text>
        );
    };
export default React.memo(CommonText);
