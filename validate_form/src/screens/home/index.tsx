import React, {useMemo} from 'react';
import {Image, KeyboardAvoidingView, SafeAreaView, ScrollView, TouchableOpacity, View, ViewStyle} from 'react-native';
import {globalStyle} from '../../style';
import {images} from '../../assets/images';
import CommonText from '../../components/text';
import CommonButton from '../../components/button';
import colors from '../../theme/colors.ts';
import CommonSearch from '../../components/search';
import useHome from './hooks/useHome';
import {TListingType} from '../../types';
import styles from './style';

const ListingType = ['Thường', 'VIP', 'Quảng cáo'];
const visibilityOptions = ['Công khai', 'Riêng tư', 'Nội bộ'];

const ProductListingForm = () => {
    const {
        formData,
        setShowVisibilityDropdown,
        showVisibilityDropdown,
        handleSave,
        handleListingTypeChange,
        errors,
        handleChange,
    } = useHome();
    const renderSearchIcon = useMemo(() => {
        return <Image style={styles.backIcon} source={images.search}/>;
    }, []);
    const titleBorderStyle = useMemo<ViewStyle>(() => ({
        borderColor: errors.title ? colors.vibrantRed : colors.borderInput,
    }), [errors.title]);

    const priceBorderStyle = useMemo<ViewStyle>(() => ({
        borderColor: errors.price ? colors.vibrantRed : colors.borderInput,
    }), [errors.price]);

    const visibilityBorderStyle = useMemo<ViewStyle>(() => ({
        borderColor: errors.visibility ? colors.vibrantRed : colors.borderInput,
    }), [errors.visibility]);
    console.log('render');
    return (
        <SafeAreaView style={globalStyle.flex_1}>
            <KeyboardAvoidingView style={globalStyle.flex_1}>
                <View style={[globalStyle.flex_1]}>
                    <View style={[globalStyle.flex_row, globalStyle.flex_centerStart, styles.appBarContainer]}>
                        <Image source={images.back}/>
                        <CommonText variant="h4" title="Tạo tin"/>
                    </View>
                    <View style={styles.chooseProductContainer}>
                        <CommonButton
                            icon={renderSearchIcon}
                            textStyle={styles.textChooseProduct} title="Chọn sản phẩm có sẵn"/>
                        <CommonText variant="h6" title="Hãy chọn sản phẩm có sẵn"/>
                    </View>
                    <ScrollView style={[globalStyle.flex_1, styles.scrollView]} showsVerticalScrollIndicator={false}>
                        <View style={styles.inputGroup}>
                            <View style={[globalStyle.flex_row, globalStyle.flex_CenterSpaceBetween]}>
                                <View style={globalStyle.flex_row}>
                                    <CommonText style={styles.label} variant="h6" title="Tiêu đề"/>
                                    <CommonText style={styles.requireFiled} variant="h5" title=" *"/>
                                </View>
                                <CommonText style={styles.charCount} variant="h5"
                                            title={`${formData.title.length}/150`}/>
                            </View>
                            <CommonSearch
                                variant="filled-outlined"
                                containerStyle={{
                                    backgroundColor: colors.white,
                                    ...titleBorderStyle,
                                }}
                                inputStyle={styles.contentInputPadding}
                                placeholder="Tiêu đề"
                                onChangeText={(text) => {
                                    handleChange('title', text);
                                }}
                                maxLength={150}
                            />
                            {errors.title && <CommonText style={styles.errorText} variant="h5" title={errors.title}/>}
                        </View>
                        <View style={[globalStyle.flex_row, globalStyle.flex_spaceBetween, styles.row]}>
                            <View style={globalStyle.flex_1}>
                                <View style={globalStyle.flex_row}>
                                    <CommonText style={styles.label} variant="h6" title="Giá hiện tại (VNĐ) "/>
                                    <CommonText style={styles.requireFiled} variant="h5" title=" *"/>
                                </View>
                                <CommonSearch
                                    variant="filled-outlined"
                                    containerStyle={{
                                        backgroundColor: colors.white,
                                        ...priceBorderStyle,
                                    }}
                                    inputStyle={styles.contentInputPadding}
                                    placeholder="3.2 tỷ,thoả thuận ..."
                                    onChangeText={(text) => {
                                        handleChange('price', text);
                                    }}
                                    keyboardType="numeric"
                                />
                                {errors.price &&
                                    <CommonText style={styles.errorText} variant="h5" title={errors.price}/>}
                            </View>

                            <View style={globalStyle.flex_1}>
                                <View style={globalStyle.flex_row}>
                                    <CommonText style={styles.label} variant="h6" title="Phạm vi hiển thị"/>
                                    <CommonText style={styles.requireFiled} variant="h5" title=" *"/>
                                </View>
                                <CommonButton
                                    variant="outline"
                                    style={[globalStyle.flex_row, globalStyle.flex_CenterSpaceBetween, styles.dropdown, {...visibilityBorderStyle}]}
                                    onPress={() => setShowVisibilityDropdown(!showVisibilityDropdown)}
                                >
                                    <CommonText variant="h5" title={formData.visibility}/>
                                    <Image source={images.dropDown}/>
                                </CommonButton>
                                {errors.visibility &&
                                    <CommonText style={styles.errorText} variant="h5" title={errors.visibility}/>}
                                {showVisibilityDropdown && (
                                    <View style={styles.dropdownMenu}>
                                        {visibilityOptions.map((option, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                style={[
                                                    styles.dropdownItem,
                                                ]}
                                                onPress={() => {
                                                    handleChange('visibility', option);
                                                    setShowVisibilityDropdown(false);
                                                }}
                                            >
                                                <CommonText variant="h5" title={option}/>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )}
                            </View>
                        </View>
                        <View style={styles.inputGroup}>
                            <CommonText variant="h6" style={styles.label} title="Mô tả"/>
                            <CommonSearch
                                containerStyle={{
                                    backgroundColor: colors.white,
                                }}
                                variant="filled-outlined"
                                scrollEnabled={true}
                                inputStyle={[styles.contentInputPadding, styles.inputDesc]}
                                placeholder="Mô tả"
                                onChangeText={(text) => {
                                    handleChange('description', text);
                                }}
                                multiline
                                numberOfLines={4}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <CommonText variant="h6" style={styles.label} title="Hình ảnh / Video"/>
                            <TouchableOpacity style={[
                                globalStyle.flex_center,
                                styles.uploadImageContainer,
                            ]}>
                                <Image source={images.add}/>
                                <CommonText style={{color: colors.primary}} variant="h5" title="0/24"/>

                            </TouchableOpacity>
                            <CommonText style={styles.textSupportTypeImage} variant="h6"
                                        title="Hỗ trợ JPG/PNG/MP4, tối đa 15 ảnh, dung lượng ≤ 5MB"/>

                        </View>
                        <View style={styles.inputGroup}>
                            <CommonText variant="h6" style={styles.label} title="Thời hạn hiển thị (Ngày)"/>
                            <CommonSearch
                                containerStyle={{
                                    backgroundColor: colors.white,
                                }}
                                placeholder={'15'}
                                inputStyle={styles.contentInputPadding}
                                variant="filled-outlined"
                                onChangeText={(text) => {
                                    handleChange('expiryDays', text);
                                }}
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={[styles.inputGroup]}>
                            <CommonText variant="h6" style={styles.label} title="Gói hiển thị"/>
                            <View style={[globalStyle.flex_row, globalStyle.flex_spaceBetween, styles.radioGroup]}>
                                {ListingType.map((type) => (
                                    <TouchableOpacity
                                        key={type}
                                        style={[globalStyle.flex_row, styles.radioOption]}
                                        onPress={() => handleListingTypeChange(type as TListingType)}
                                    >
                                        <View style={[globalStyle.flex_center, styles.radioButton]}>
                                            {formData.listingType === type && <View style={styles.radioSelected}/>}
                                        </View>
                                        <CommonText variant="h5" title={type}/>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>


                    </ScrollView>
                    <View style={[globalStyle.flex_spaceBetween, globalStyle.flex_row, styles.buttonRow]}>
                        <CommonButton style={globalStyle.flex_1} variant="outline" title="Huỷ"/>
                        <CommonButton onPress={handleSave} style={globalStyle.flex_1} variant="primary" title="Lưu"/>
                    </View>
                </View>
            </KeyboardAvoidingView>

        </SafeAreaView>

    );
};

export default ProductListingForm;

