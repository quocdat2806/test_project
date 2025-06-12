import React from 'react';
import {StyleProp, TextInput, View, ViewStyle} from 'react-native';
import {CommonSearchProps} from './type';
import {styles} from './style';
import colors from '../../theme/colors.ts';
import {globalStyle} from '../../style';

const CommonSearch: React.FC<CommonSearchProps> =
    ({
         placeholder = 'Search...',
         value,
         containerStyle,
         autoFocus = false,
         trailingIcon,
         inputStyle,
         leadingIcon,
         handleInputChange,
         variant = 'filled-outlined',
         ...rest
     }) => {
        const defaultContainerStyle: StyleProp<ViewStyle> = [
            variant === 'filled-outlined' && styles.filledOutline,
            variant === 'outlined' && styles.outlined,
            variant === 'standard' && styles.standard,
            globalStyle.flex_1,
            globalStyle.flex_row,
            styles.container,
            containerStyle,
        ];
        return (
            <View style={defaultContainerStyle}>
                {leadingIcon}
                <TextInput
                    style={[globalStyle.flex_1, inputStyle]}
                    placeholder={placeholder}
                    placeholderTextColor={colors.coolGray}
                    value={value}
                    onChangeText={handleInputChange}
                    autoFocus={autoFocus}
                    clearButtonMode="never"
                    {...rest}
                />
                {trailingIcon}
            </View>
        );
    };
export default React.memo(CommonSearch);
