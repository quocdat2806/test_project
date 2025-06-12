import {StyleProp, TextProps, TextStyle} from 'react-native';

export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'small';

export interface CommonTextProps extends TextProps {
    title: string;
    variant?: TextVariant;
    style?: StyleProp<TextStyle>;
}
