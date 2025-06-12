import {StyleSheet} from 'react-native';
import colors from '../../theme/colors.ts';
import {fonts} from '../../theme/fonts.ts';


export const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        height: 48,
    },
    primary: {
        backgroundColor: colors.primary,
    },
    secondary: {
        backgroundColor: colors.secondary,
    },
    outline: {
        backgroundColor: colors.transparent,
        borderWidth: 1,
        borderColor: colors.lightBorder,
    },
    disabled: {
        opacity: 0.5,
    },
    title: {
        fontSize: 16,
        fontFamily: fonts.medium,
    },
    primaryTitle: {
        color: colors.white,
    },
    secondaryTitle: {
        color: colors.white,
    },
    outlineTitle: {
        color: colors.black,
    },
    loadingContainer: {
        marginRight: 8,
    },
});
