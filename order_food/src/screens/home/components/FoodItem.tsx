import React, {useRef, useState} from 'react';
import {
    Animated,
    Easing,
    Image,
    Modal,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import colors from '../../../theme/colors.ts';
import {fonts} from '../../../theme/fonts.ts';
import {images} from '../../../assets/images';
import TFoodItem from '../../../types/foodItem.ts';
import {globalStyle} from '../../../style';
import CommonText from '../../../components/text';

interface FoodItemProps {
    item: TFoodItem,
    isChecked?: boolean;
    onToggle: (item: TFoodItem) => void;
    onQtyChange: (item: TFoodItem, delta: number) => void;
    getQuantity: (item: TFoodItem) => number;
    hideAllAction?: boolean;

}

const FoodItem =
    ({
         item,
         isChecked = false,
         onToggle,
         onQtyChange,
         getQuantity,
         hideAllAction,
     }: FoodItemProps) => {
        const [menuVisible, setMenuVisible] = useState(false);
        const [moreButtonLayout, setMoreButtonLayout] = useState<{
            x: number;
            y: number;
            width: number;
            height: number;
        } | null>(null);
        const scaleAnim = useRef(new Animated.Value(0)).current;
        // @ts-ignore
        const moreButtonRef = useRef<TouchableOpacity | null>(null);

        const openMenu = () => {
            moreButtonRef.current?.measureInWindow((x: number, y: number, width: number, height: number) => {
                setMoreButtonLayout({x, y, width, height});
                setMenuVisible(true);
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 150,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }).start();
            });
        };

        const closeMenu = () => {
            Animated.timing(scaleAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }).start(() => setMenuVisible(false));
        };

        const getMenuPosition = () => {
            if (!moreButtonLayout) {
                return {top: 0, right: 24};
            }
            const screenPadding = 24;
            return {
                top: moreButtonLayout.y + moreButtonLayout.height + 4,
                right: screenPadding,
            };
        };

        const handleMarkItem = () => {
            closeMenu();
        };

        const handleSaveItem = () => {
            closeMenu();
        };

        const handleDeleteItem = () => {
            closeMenu();
        };

        const renderCheckIcon = hideAllAction ? null : (
            <TouchableOpacity onPress={() => onToggle(item)}>
                <Image source={isChecked ? images.checked : images.unChecked}/>
            </TouchableOpacity>
        );

        const renderMoreBtn = hideAllAction ? null : (
            <TouchableOpacity
                ref={moreButtonRef}
                onPress={openMenu}>
                <Image source={images.more}/>
            </TouchableOpacity>
        );

        const renderButtonDecrease = hideAllAction ? null : (
            <TouchableOpacity onPress={() => onQtyChange(item, -1)} style={[globalStyle.flex_center, styles.qtyBtn]}>
                <CommonText variant="h6" style={styles.qtyBtnText} title={'-'}/>
            </TouchableOpacity>
        );

        const renderButtonIncrease = hideAllAction ? null : (
            <TouchableOpacity onPress={() => onQtyChange(item, 1)} style={[globalStyle.flex_center, styles.qtyBtn]}>
                <CommonText variant="h6" style={styles.qtyBtnText} title={'+'}/>
            </TouchableOpacity>
        );

        const renderButtonBuyNow = hideAllAction ? <View/> : (
            <TouchableOpacity onPress={() => onToggle(item)} style={styles.buyNowBtn}>
                <CommonText variant="h6" style={styles.buyNowText} title={'Mua ngay'}/>
            </TouchableOpacity>
        );
        const renderContent = () => (
            <View style={[globalStyle.flex_column, globalStyle.flex_1]}>
                <View style={[globalStyle.flex_row, globalStyle.flex_CenterSpaceBetween]}>
                    <CommonText
                        variant="h6" title={item.name} numberOfLines={1}
                        style={[globalStyle.flex_1, styles.textTitle, styles.defaultTextColor]}/>
                    {renderMoreBtn}
                </View>
                <View style={[globalStyle.flex_row, globalStyle.flex_CenterSpaceBetween, styles.mt4]}>
                    <CommonText style={styles.defaultTextColor} variant="small"
                                title={`Đơn giá: ${item.price.toLocaleString()}đ`}/>
                    <View style={[globalStyle.flex_row, globalStyle.flex_CenterSpaceBetween]}>
                        <CommonText style={styles.defaultTextColor} variant="small" title="Số lượng: "/>
                        {renderButtonDecrease}
                        <CommonText style={styles.defaultTextColor} variant="small" title={`${getQuantity(item)}`}/>
                        {renderButtonIncrease}
                    </View>
                </View>
                <View style={[globalStyle.flex_row, globalStyle.flex_CenterSpaceBetween, styles.mt4]}>
                    {renderButtonBuyNow}
                    <CommonText
                        style={styles.totalPrice} variant="h5"
                        title={`${(item.price * getQuantity(item)).toLocaleString()} đ`}/>
                </View>
            </View>
        );

        const renderPopUp = () => (
            <Modal
                visible={menuVisible}
                transparent
                animationType="none"
                onRequestClose={closeMenu}
            >
                <TouchableWithoutFeedback onPress={closeMenu}>
                    <View style={[globalStyle.flex_1, styles.overlay]}>
                        <Animated.View
                            style={[
                                styles.menu,
                                getMenuPosition(),
                                {
                                    opacity: scaleAnim,
                                    transform: [{scale: scaleAnim}],
                                },
                            ]}
                        >
                            <TouchableOpacity style={styles.menuItem} onPress={handleMarkItem}>
                                <View
                                    style={[globalStyle.flex_row, globalStyle.flex_centerStart, styles.menuItemContainer]}>
                                    <Image source={images.coin}/>
                                    <CommonText title="Đánh dấu" variant="h6" style={styles.defaultTextColor}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuItem} onPress={handleSaveItem}>
                                <View
                                    style={[globalStyle.flex_row, globalStyle.flex_centerStart, styles.menuItemContainer]}>
                                    <Image source={images.share}/>
                                    <CommonText title="Lưu lại" variant="h6" style={styles.defaultTextColor}/>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuItem} onPress={handleDeleteItem}>
                                <View
                                    style={[globalStyle.flex_row, globalStyle.flex_centerStart, styles.menuItemContainer]}>
                                    <Image source={images.delete}/>
                                    <CommonText title="Xoá" variant="h6" style={styles.defaultTextColor}/>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );

        return (
            <View style={[globalStyle.flex_row, styles.container]}>
                {renderCheckIcon}
                <Image source={item.image}/>
                {renderContent()}
                {renderPopUp()}
            </View>
        );
    };

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 8,
        margin: 12,
        padding: 8,
        gap: 8,
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
        borderWidth: 1,
        borderColor: colors.thinGray,
    },
    defaultTextColor: {
        color: colors.midnightBlue,
    },
    mt4: {marginTop: 4},
    textTitle: {
        fontFamily: fonts.medium,
    },
    qtyBtn: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.primaryBorder,
        marginHorizontal: 4,
    },
    qtyBtnText: {color: colors.primaryBorder},

    buyNowBtn: {
        borderWidth: 1,
        borderColor: colors.primaryBorder,
        borderRadius: 6,
        paddingVertical: 4,
        paddingHorizontal: 12,
    },
    buyNowText: {color: colors.primaryBorder},
    totalPrice: {fontFamily: fonts.bold, color: colors.vibrantRed},

    overlay: {
        backgroundColor: colors.transparent,
    },
    menu: {
        position: 'absolute',
        minWidth: 200,
        backgroundColor: colors.white,
        borderRadius: 8,
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 6,
        gap: 8,
    },
    menuItemContainer: {
        gap: 8,
    },
    menuItem: {
        paddingVertical: 4,
        paddingHorizontal: 16,
    },
    menuText: {
        fontSize: 14,
        color: colors.black,
        fontFamily: fonts.regular,
    },
});

export default React.memo(FoodItem);
