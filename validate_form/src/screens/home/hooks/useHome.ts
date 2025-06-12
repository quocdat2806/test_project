import {useRef, useState} from 'react';
import {TListingType} from '../../../types';

interface FormData {
    title: string;
    price: string;
    description: string;
    visibility: string;
    listingType: TListingType;
    expiryDays: string;
}

interface Errors {
    title?: string | null;
    price?: string | null;
    visibility?: string | null;
}

const useHome = () => {
    const formDataRef = useRef<FormData>({
        title: '',
        price: '',
        description: '',
        visibility: '',
        listingType: 'Thường',
        expiryDays: '15',
    });

    const [errors, setErrors] = useState<Errors>({});
    const [showVisibilityDropdown, setShowVisibilityDropdown] = useState(false);
    const [, forceUpdate] = useState(0);

    const handleChange = <K extends keyof FormData>(
        key: K,
        value: FormData[K],
    ) => {
        formDataRef.current[key] = value;

        // @ts-ignore
        if (errors[key]) {
            setErrors((prev) => ({...prev, [key]: null}));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Errors = {};
        const formData = formDataRef.current;

        if (!formData.title.trim()) {
            newErrors.title = 'Vui lòng nhập tiêu đề';
        }

        if (!formData.price.trim()) {
            newErrors.price = 'Vui lòng điền giá';
        }

        if (!formData.visibility) {
            newErrors.visibility = 'Vui lòng chọn phạm vi';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateForm()) {
            const finalData = formDataRef.current;
            console.log(finalData);
            //toto call api to BE
        }
    };

    const handleListingTypeChange = (type: TListingType) => {
        formDataRef.current.listingType = type;
        if (type === 'Quảng cáo') {
            formDataRef.current.visibility = 'Công khai';
        }
        if (errors.visibility) {
            setErrors((prev) => ({...prev, visibility: null}));
        }
        forceUpdate((n) => n + 1);
    };

    return {
        formData: formDataRef.current,
        handleChange,
        handleListingTypeChange,
        handleSave,
        showVisibilityDropdown,
        setShowVisibilityDropdown,
        errors,
        setErrors,
    };
};

export default useHome;

