import {StyleSheet} from 'react-native';
import {fonts} from '../../theme/fonts.ts';
import colors from '../../theme/colors.ts';

const styles = StyleSheet.create({
    backIcon: {
        marginVertical: 10,
        marginHorizontal: 8,
    },
    titleAppBar: {
        fontFamily: fonts.medium,
    },
    searchContainer: {
        margin: 12,
        alignItems: 'center',
        gap: 6,
    },
    searchIcon: {
        margin: 8,
    },
    sortIconContainer: {
        padding: 8,
        borderWidth: 1,
        borderColor: colors.cloudGray,
        backgroundColor: colors.white,
        borderRadius: 6,
    },
    listContainer: {
        paddingBottom: 12,
    },
    buttonContainer: {
        gap: 8,
        padding: 12,
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: -5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 2,
        borderTopColor: colors.lightBorder,
        borderTopWidth: 1,
    },
    confirmBuyOrderContainer: {
        justifyContent: 'flex-end',
        padding: 12,
    },
    tittleConfirmOrder: {
        textAlign: 'center',
        fontFamily: fonts.bold,
    },
    totalPriceContainer: {
        padding: 12,
    },
    totalPriceInner: {
        alignItems: 'center',
        backgroundColor: colors.thinBlue,
        padding: 12,
        borderRadius: 8,
        gap: 6,
        marginBottom: 12,
    },
    totalPriceTextContainer: {
        gap: 8,
    },
    textTotal: {
        fontFamily: fonts.medium,
        color: colors.midnightBlue,
    },
    textPrice: {
        fontFamily: fonts.bold,
        color: colors.vibrantRed,
    },
    buttonActionContainer: {
        gap: 8,
    },
});
export default styles;
