import {useCallback, useMemo, useRef, useState} from 'react';
import TFoodItem from '../../../types/foodItem.ts';
import useDebounceRef from '../../../hooks/useDebounce.ts';
import {dummyDataListFood} from '../../../dummyData';

const useHome = () => {
    const [checkedFood, setCheckedFood] = useState<TFoodItem[]>([]);
    const [quantities, setQuantities] = useState<Map<number, number>>(new Map());
    const [listFood, setListFood] = useState<TFoodItem[]>(dummyDataListFood);

    const textSearchRef = useRef<string>('');

    const handleSearchFoodItem = (value: string) => {
        if (!value.trim()) {
            setListFood(dummyDataListFood);
            return;
        }

        const filteredFood = dummyDataListFood.filter(food =>
            food.name.toLowerCase().includes(value.toLowerCase())
        );

        setListFood(filteredFood);
    };
    const triggerDebounce = useDebounceRef(textSearchRef, 700, (val) => {
        console.log(val);
        handleSearchFoodItem(val);
    });
    const handleInputChange = useCallback((text: string) => {
        textSearchRef.current = text;
        triggerDebounce();
    }, []);

    const onToggle = useCallback((item: TFoodItem) => {
        setCheckedFood(prev => {
            const exists = prev.some(x => x.id === item.id);
            if (exists) {
                return prev.filter(x => x.id !== item.id);
            }
            return [...prev, item];
        });
    }, []);

    const getTotalPrice = () => {
        return checkedFood.reduce((total, item) => {
            const quantity = quantities.get(item.id) ?? item.quantity;
            return total + quantity * item.price;
        }, 0);
    };
    const onChangeQuantity = useCallback(
        (item: TFoodItem, delta: number) => {
            setQuantities(prev => {
                const currentQty = prev.get(item.id) ?? item.quantity;
                const newQty = Math.max(1, currentQty + delta);
                const newMap = new Map(prev);
                newMap.set(item.id, newQty);
                return newMap;
            });

            setCheckedFood(prev => {
                const exists = prev.some(x => x.id === item.id);
                if (exists) {
                    return prev.map(x => {
                        if (x.id === item.id) {
                            const currentQty = quantities.get(item.id) ?? x.quantity;
                            const newQty = Math.max(1, currentQty + delta);
                            return {
                                ...x,
                                quantity: newQty,
                                totalPrice: newQty * x.price,
                            };
                        }
                        return x;
                    });
                }
                return prev;
            });
        },
        [quantities]
    );

    const checkedIds = useMemo(
        () => new Set(checkedFood.map(x => x.id)),
        [checkedFood]
    );

    const isCheckedItem = useCallback(
        (id: number): boolean => checkedIds.has(id),
        [checkedIds]
    );

    const getQuantity = useCallback(
        (item: TFoodItem): number => quantities.get(item.id) ?? item.quantity,
        [quantities]
    );

    return {
        checkedFood,
        onToggle,
        onChangeQuantity,
        isCheckedItem,
        getQuantity,
        handleInputChange,
        getTotalPrice,
        listFood,
    };
};

export default useHome;
