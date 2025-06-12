import React from 'react';
import {StyleProp, TextInputProps, ViewStyle} from 'react-native';

export type InputVariant = 'outlined' | 'filled-outlined' | 'standard';

export interface CommonSearchProps extends TextInputProps {
    placeholder?: string;
    value?: string;
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<ViewStyle>;
    trailingIcon?: React.JSX.Element;
    leadingIcon?: React.JSX.Element;
    variant?: InputVariant;
    handleInputChange?: (text: string) => void;
}
