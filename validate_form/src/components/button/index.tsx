import React from 'react';
import {StyleProp, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {CommonButtonProps} from './type';
import {styles} from './style';
import CommonText from '../text';
import {globalStyle} from '../../style';

const CommonButton: React.FC<CommonButtonProps> =
    ({
         title,
         loading = false,
         disabled = false,
         variant = 'primary',
         style,
         textStyle,
         icon,
         children,
         ...rest
     }) => {
        const containerStyle: StyleProp<ViewStyle> = [
            styles.container,
            globalStyle.flex_row,
            globalStyle.flex_center,
            styles[variant],
            disabled && styles.disabled,
            style,
        ];

        const titleStyle: StyleProp<TextStyle> = [
            styles.title,
            variant === 'primary' && styles.primaryTitle,
            variant === 'secondary' && styles.secondaryTitle,
            variant === 'outline' && styles.outlineTitle,
            textStyle,
        ];

        return (
            <TouchableOpacity
                style={containerStyle}
                disabled={disabled || loading}
                activeOpacity={0.7}
                {...rest}
            >
                {children}
                {icon}
                {title && <CommonText title={title} style={titleStyle}/>}
            </TouchableOpacity>
        );
    };

export default React.memo(CommonButton);
