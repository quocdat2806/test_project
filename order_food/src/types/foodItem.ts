import {ImageSourcePropType} from 'react-native';

type  TFoodItem = {
    id: number,
    name: string;
    price: number;
    image: ImageSourcePropType;
    quantity: number;
    totalPrice: number;
}
export default TFoodItem;
