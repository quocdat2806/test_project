import {StyleSheet} from 'react-native';
import colors from '../../theme/colors.ts';


export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    outlined: {
        borderWidth: 1,
        borderColor: colors.cloudGray,
        borderRadius: 10,
    },
    filledOutline: {
        borderWidth: 1,
        borderColor: colors.cloudGray,
        backgroundColor: colors.translucentGray,
        borderRadius: 10,
    },
    standard: {
        borderBottomColor: colors.cloudGray,
        borderBottomWidth: 1,
    },
});
