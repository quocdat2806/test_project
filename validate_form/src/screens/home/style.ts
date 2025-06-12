import {StyleSheet} from 'react-native';
import colors from '../../theme/colors.ts';
import {fonts} from '../../theme/fonts.ts';

const MARGIN_BOTTOM = 48 + 24 + 24;

const styles = StyleSheet.create({
    appBarContainer: {
        padding: 10,
    },
    scrollView: {
        padding: 10,
        marginBottom: MARGIN_BOTTOM,
    },
    backIcon: {
        marginRight: 8,
    },
    chooseProductContainer: {
        paddingVertical: 12,
        gap: 8,
        backgroundColor: colors.lightBlue,
        padding: 10,
    },
    textChooseProduct: {
        fontSize: 14,
    },
    inputGroup: {
        marginBottom: 16,
        position: 'relative',
    },
    requireFiled: {
        color: colors.vibrantRed,
        fontFamily: fonts.medium,
    },
    contentInputPadding: {paddingHorizontal: 12},
    label: {
        fontFamily: fonts.medium,
    },
    charCount: {
        color: colors.coolGray,
    },
    errorText: {
        color: colors.vibrantRed,
        marginTop: 4,
    },
    row: {
        marginBottom: 16,
        gap: 12,
    },
    dropdown: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        height: 42,
        backgroundColor: colors.white,
    },
    dropdownArrow: {
        fontSize: 12,
        color: colors.gray,
    },
    dropdownMenu: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.lightBorder,
        borderRadius: 8,
        zIndex: 1000,
        elevation: 6,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    dropdownItem: {
        padding: 12,
    },
    inputDesc: {
        alignSelf: 'flex-start',
    },
    uploadImageContainer: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: colors.primaryBorder,
        borderRadius: 12,
        gap: 4,
    },
    textSupportTypeImage: {
        color: colors.coolGray,
        marginTop: 4,
    },
    radioGroup: {
        marginTop: 8,
    },
    radioOption: {
        alignItems: 'center',
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.primaryBorder,
        marginRight: 8,
    },
    radioSelected: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.primary,
    },
    buttonRow: {
        padding: 12,
        gap: 8,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: -5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    },
});

export default styles;
