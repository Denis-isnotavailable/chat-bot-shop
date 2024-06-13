import {useEffect, useState} from 'react';
import Button from "../Button/Button";
import './ProductItem.css';

const ProductItem = ({ product, className, onAdd, addedItems }) => {
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {        
        const isProductInCart = addedItems.find(({ id }) => id === product.id);
        if (isProductInCart) setIsInCart(true)
        else setIsInCart(false)        
        
    }, [addedItems, product.id]);

    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <li className={'product ' + className}>
            <div className={'img_box'}>
                <img src={product.image} alt={product.title} className={'img'} />
            </div>
            <div className={'title'}>{product.title}</div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'}>
                <span>Вартість: <b>{product.price}</b></span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                {isInCart ? 'В кошику' : 'Додати в кошик'}
            </Button>
        </li>
    );
};

export default ProductItem;