import {StyleProp, TextStyle, TouchableOpacityProps, ViewStyle} from 'react-native';
import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

export interface CommonButtonProps extends TouchableOpacityProps {
    title?: string;
    loading?: boolean;
    disabled?: boolean;
    variant?: ButtonVariant;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    icon?: React.JSX.Element,
    children?: React.ReactNode,
}
