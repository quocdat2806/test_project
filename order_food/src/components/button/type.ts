import {StyleProp, TouchableOpacityProps, ViewStyle} from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

export interface CommonButtonProps extends TouchableOpacityProps {
    title: string;
    loading?: boolean;
    disabled?: boolean;
    variant?: ButtonVariant;
    style?: StyleProp<ViewStyle>;
}
