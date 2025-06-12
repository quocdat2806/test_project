import React, {useCallback, useMemo} from 'react';
import {FlatList, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, TouchableOpacity, View,} from 'react-native';

import CommonButton from '../../components/button';
import CommonSearch from '../../components/search';
import CommonText from '../../components/text';

import useHome from './hooks/useHome.ts';
import {useModal} from '../../context/ModalContext.tsx';

import {images} from '../../assets/images';
import {globalStyle} from '../../style';
import FoodItem from './components/FoodItem.tsx';

import TFoodItem from '../../types/foodItem.ts';
import styles from './style.ts';

const PADDING_BUTTON_HEIGHT = 48 + 24 + 24;

const HomeScreen = (): React.JSX.Element => {
    const {show, hide} = useModal();
    const {
        listFood,
        onToggle,
        getTotalPrice,
        checkedFood,
        handleInputChange,
        isCheckedItem,
        onChangeQuantity,
        getQuantity,
    } = useHome();

    const renderSearchIcon = useMemo(() => (
        <Image style={styles.searchIcon} source={images.search}/>
    ), []);

    const renderFoodItem = useCallback((item: TFoodItem, hideAllAction = false) => (
        <FoodItem
            item={item}
            onToggle={onToggle}
            onQtyChange={onChangeQuantity}
            isChecked={isCheckedItem(item.id)}
            getQuantity={getQuantity}
            hideAllAction={hideAllAction}
        />
    ), [onToggle, onChangeQuantity, isCheckedItem, getQuantity]);

    const renderFoodList = (data: TFoodItem[], hideAllAction = false) => {
        const renderItem = ({item}: { item: TFoodItem }) => renderFoodItem(item, hideAllAction);

        return (
            <FlatList
                data={data}
                scrollEnabled={!hideAllAction}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={hideAllAction ? {} : styles.listContainer}
                style={hideAllAction ? {} : {paddingBottom: PADDING_BUTTON_HEIGHT}}
            />
        );
    };

    const renderFoodListConfirm = useMemo(() => {
        return (
            <View style={[globalStyle.flex_1]}>
                <View style={[globalStyle.flex_row, styles.confirmBuyOrderContainer]}>
                    <TouchableOpacity onPress={hide}>
                        <Image source={images.close}/>
                    </TouchableOpacity>
                </View>
                <CommonText
                    style={styles.tittleConfirmOrder}
                    title="Xác nhận đơn hàng"
                />
                <View style={globalStyle.flex_1}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {renderFoodList(checkedFood, true)}
                    </ScrollView>
                </View>

                <View style={styles.totalPriceContainer}>
                    <View style={[globalStyle.flex_row, styles.totalPriceInner, globalStyle.flex_spaceBetween]}>
                        <View style={[globalStyle.flex_row, globalStyle.flex_center, styles.totalPriceTextContainer]}>
                            <Image source={images.info}/>
                            <CommonText style={styles.textTotal} variant="h6" title="Tổng số tiền:"/>
                        </View>
                        <CommonText title={`${getTotalPrice().toLocaleString()} đ`} variant="h5"
                                    style={[styles.textPrice]}/>
                    </View>

                    <View style={[globalStyle.flex_row, styles.buttonActionContainer]}>
                        <CommonButton onPress={hide} variant="outline" style={globalStyle.flex_1} title="Huỷ"/>
                        <CommonButton onPress={hide} variant="primary" style={globalStyle.flex_1} title="Xác nhận"/>
                    </View>
                </View>
            </View>
        );
    }, [checkedFood]);

    return (
        <SafeAreaView style={globalStyle.flex_1}>
            <KeyboardAvoidingView
                style={globalStyle.flex_1}
            >
                <View style={globalStyle.flex_1}>
                    <View>
                        <View style={[globalStyle.flex_row, globalStyle.flex_centerStart]}>
                            <Image source={images.back} style={styles.backIcon}/>
                            <CommonText title="Chọn sản phẩm có sẵn" style={styles.titleAppBar}/>
                        </View>
                        <View style={[styles.searchContainer, globalStyle.flex_row]}>
                            <CommonSearch
                                handleInputChange={handleInputChange}
                                variant="filled-outlined"
                                leadingIcon={renderSearchIcon}
                                placeholder="Tìm theo tên, mã sản phẩm, ..."
                            />
                            <View style={styles.sortIconContainer}>
                                <Image source={images.sort}/>
                            </View>
                        </View>
                    </View>

                    <View style={globalStyle.flex_1}>
                        {renderFoodList(listFood)}
                    </View>

                    <View style={[styles.buttonContainer, globalStyle.flex_row]}>
                        <CommonButton variant="outline" style={globalStyle.flex_1} title={'Huỷ'}/>
                        <CommonButton
                            disabled={checkedFood.length === 0}
                            onPress={() => {
                                show(renderFoodListConfirm, '60%');
                            }}
                            variant="primary" style={globalStyle.flex_1}
                            title={'Xác nhận'}/>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};


export default HomeScreen;
