import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const products = [
    {id: '1', title: 'Джинсы', price: 500, description: 'Синего цвета, прямые', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbPl9ck0xRFrWSQkG3CVjF0hToyZgvsjXA3A&s'},
    {id: '2', title: 'Куртка', price: 1200, description: 'Зеленого цвета, теплая', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbPl9ck0xRFrWSQkG3CVjF0hToyZgvsjXA3A&s'},
    {id: '3', title: 'Джинсы 2', price: 500, description: 'Синего цвета, прямые', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbPl9ck0xRFrWSQkG3CVjF0hToyZgvsjXA3A&s'},
    {id: '4', title: 'Куртка 8', price: 122, description: 'Зеленого цвета, теплая', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbPl9ck0xRFrWSQkG3CVjF0hToyZgvsjXA3A&s'},
    {id: '5', title: 'Джинсы 3', price: 500, description: 'Синего цвета, прямые', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbPl9ck0xRFrWSQkG3CVjF0hToyZgvsjXA3A&s'},
    {id: '6', title: 'Куртка 7', price: 600, description: 'Зеленого цвета, теплая', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbPl9ck0xRFrWSQkG3CVjF0hToyZgvsjXA3A&s'},
    {id: '7', title: 'Джинсы 4', price: 550, description: 'Синего цвета, прямые', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbPl9ck0xRFrWSQkG3CVjF0hToyZgvsjXA3A&s'},
    {id: '8', title: 'Куртка 5', price: 1200, description: 'Зеленого цвета, теплая', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbPl9ck0xRFrWSQkG3CVjF0hToyZgvsjXA3A&s'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const { tg, queryId } = useTelegram();
    
    console.log(addedItems);

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://192.168.31.113:8000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems, queryId])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData, tg])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if (alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купити ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <ul className={'list'}>
            {products.map(item => (
                <ProductItem
                    key={item?.id}    
                    product={item}
                    onAdd={onAdd}
                    addedItems={addedItems}
                    className={'item'}
                />
            ))}
        </ul>
    );
};

export default ProductList;