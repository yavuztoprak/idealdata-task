import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from '@rneui/themed';

export default function Hisselerim({ symbol, count }) {
    const [currentPrice, setCurrentPrice] = useState(null);
    const Total = (currentPrice * count).toFixed(2);

    useEffect(() => {
        const getPrice = async () => {
            let stocks = await AsyncStorage.getItem('stocks');
            stocks = JSON.parse(stocks);
            const stock = stocks.stocks.find(s => s.symbol === symbol);
            if (stock) {
                setCurrentPrice(stock.currentPrice);
            }

        }

        getPrice();
    }, [symbol]);

    return (
        <TouchableOpacity >


            <Card>
                <Card.Title>{symbol?.toUpperCase()}</Card.Title>
                <Card.Divider />
                <Text style={styles.text}>Adet: {count ? count : 0}</Text>
                <Text style={styles.text}>Toplam Değer: {Total ? Total : 0} ₺</Text>
            </Card>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
    },
    cell: {
        flex: 1,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
    },
});