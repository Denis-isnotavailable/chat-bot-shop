import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            area,
            city,
            address,
            phone
        }
        tg.sendData(JSON.stringify(data));
    }, [address, area, city, phone, tg])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData, tg])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Відправити дані'
        })
    }, [tg.MainButton])

    useEffect(() => {
        if(!area || !city || !address || !phone) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [address, area, city, phone, tg.MainButton])

    const onChangeArea = (e) => {
        setArea(e.target.value)
    }

    const onChangeCity = (e) => {
        setCity(e.target.value)
    }

    const onChangeAddress = (e) => {
        setAddress(e.target.value)
    }

    const onChangePhone = (e) => {
        setPhone(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Введіть ваші дані</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Область'}
                value={area}
                onChange={onChangeArea}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Місто'}
                value={city}
                onChange={onChangeCity}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Адреса'}
                value={address}
                onChange={onChangeAddress}
            />
            <input
                className={'input'}
                type="tel"
                placeholder={'Номер телефону'}
                value={phone}
                onChange={onChangePhone}
            />
        </div>
    );
};

export default Form;