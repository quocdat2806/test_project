import {StyleSheet} from 'react-native';

export const globalStyle = StyleSheet.create({
    flex_1: {
        flex: 1,
    },
    flex_row: {
        flexDirection: 'row',
    },
    flex_column: {
        flexDirection: 'column',
    },

    flex_center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    flex_start: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    flex_end: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    flex_centerStart: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    flex_centerEnd: {
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    flex_startCenter: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    flex_endCenter: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    flex_CenterSpaceBetween: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    flex_spaceBetween: {
        justifyContent: 'space-between',
    },
    flex_spaceAround: {
        justifyContent: 'space-around',
    },
    flex_spaceEvenly: {
        justifyContent: 'space-evenly',
    },
});
