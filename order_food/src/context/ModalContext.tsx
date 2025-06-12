import React, {createContext, ReactElement, ReactNode, useContext, useRef, useState} from 'react';
import {Animated, Easing, Modal, StyleSheet, View, ViewStyle} from 'react-native';
import {SCREEN_HEIGHT} from '../constants/layout.ts';
import {globalStyle} from '../style';
import colors from '../theme/colors.ts';

type AllowedHeight = number | `${number}%`;

type ModalContentType = {
    component: ReactElement;
    height?: AllowedHeight;
};

type ModalContextType = {
    show: (component: ReactElement, height?: AllowedHeight) => void;
    hide: () => void;
};

const ModalContext = createContext<ModalContextType>({
    show: () => {
    },
    hide: () => {
    },
});

export const useModal = () => useContext(ModalContext);

type ModalProviderProps = {
    children: ReactNode;
};

export const ModalProvider: React.FC<ModalProviderProps> = ({children}) => {
    const [visible, setVisible] = useState(false);
    const [modalContent, setModalContent] = useState<ModalContentType | null>(null);

    const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    const animateModal = (
        toValue: number,
        duration: number,
        callback?: () => void
    ) => {
        const isShowing = toValue === 0;

        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue,
                duration,
                easing: isShowing
                    ? Easing.bezier(0.25, 0.46, 0.45, 0.94)
                    : Easing.bezier(0.55, 0.06, 0.68, 0.19),
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: isShowing ? 1 : 0,
                duration: isShowing ? duration : duration * 0.8,
                easing: isShowing
                    ? Easing.out(Easing.ease)
                    : Easing.in(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start(() => callback?.());
    };

    const show = (component: ReactElement, height?: AllowedHeight) => {
        setModalContent({component, height});
        setVisible(true);
        slideAnim.setValue(SCREEN_HEIGHT);
        opacityAnim.setValue(0);
        animateModal(0, 300);
    };

    const hide = () => {
        animateModal(SCREEN_HEIGHT, 280, () => {
            setVisible(false);
            setModalContent(null);
        });
    };

    const modalDynamicStyle: ViewStyle = modalContent?.height
        ? {height: modalContent.height}
        : {maxHeight: '90%'};

    return (
        <ModalContext.Provider value={{show, hide}}>
            {children}
            <Modal
                transparent
                visible={visible}
                animationType="none"
                onRequestClose={hide}
                statusBarTranslucent
            >
                <Animated.View
                    style={[
                        globalStyle.flex_1,
                        globalStyle.flex_center,
                        {opacity: opacityAnim},
                    ]}
                >
                    <View style={styles.overlay}/>
                    <Animated.View
                        style={[
                            styles.modalContent,
                            {transform: [{translateY: slideAnim}]},
                            modalDynamicStyle,
                        ]}
                    >
                        {modalContent?.component}
                    </Animated.View>
                </Animated.View>
            </Modal>
        </ModalContext.Provider>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: colors.white,
        borderRadius: 16,
        width: '95%',
        padding: 8,
        overflow: 'hidden',
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 8,
    },
});
