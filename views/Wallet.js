import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from '@rneui/themed';
import { useIsFocused } from '@react-navigation/native';
import Hisselerim from './components/Hisselerim';

export default function Wallet() {
    const [balance, setBalance] = useState(0);
    const [myAssets, setMyAssets] = useState();
    const isFocused = useIsFocused();
    const [toplamHisse, setToplamHisse] = useState(0);

    useEffect(() => {
        const fetchBalanceAndAssets = async () => {
            const storedBalance = await AsyncStorage.getItem('balance');
            const storedAssets = await AsyncStorage.getItem('myAssets');
            console.log(storedAssets);
            if (storedBalance !== null) {
                setBalance(parseInt(storedBalance).toFixed(2));
            }

            if (storedAssets !== null) {
                setMyAssets(JSON.parse(storedAssets));
            }
        };
        fetchBalanceAndAssets();
    }, [balance, isFocused]);

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
            <Card>
                <Card.Title>Bakiye</Card.Title>
                <Card.Divider />
                <Text style={styles.text}>Fiat : {balance} ₺</Text>
            </Card>

            {myAssets &&
                Object.entries(myAssets).map(([symbol, stock], index) => {
                    return (
                        <Hisselerim key={index}
                            symbol={symbol} count={stock}
                            setToplamHisse={setToplamHisse}
                        />
                    )
                })
            }

            <Card >
                <Card.Title>Para Yatır / Çek</Card.Title>
                <Card.Divider />
                <Paraekle balance={parseInt(balance)} setBalance={setBalance} />
            </Card>
        </ScrollView>
    )
}

const Paraekle = ({ setBalance, balance }) => {
    const [amount, setAmount] = useState('');

    const handleDeposit = async () => {
        const newBalance = balance + parseFloat(amount);
        if (isNaN(newBalance)) {
            alert('Geçersiz miktar !');
            return;
        }
        await AsyncStorage.setItem('balance', newBalance.toString());
        alert('Para yatırma işlemi başarılı !');
        setBalance(newBalance);
    };

    const handleWithdraw = async () => {
        if (balance >= parseFloat(amount)) {
            const newBalance = balance - parseFloat(amount);
            await AsyncStorage.setItem('balance', newBalance.toString());
            alert('Para çekme işlemi başarılı !');
            setBalance(newBalance);
        } else {
            alert('Geçersiz miktar !');
        }
    };

    return (
        <View >
            <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                placeholder="Miktar ₺"
                keyboardType="numeric"
            />
            <View style={styles.buttons}>
                <Button title="Para Yatır" onPress={handleDeposit} />
                <Button title="Para Çek" onPress={handleWithdraw} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        paddingHorizontal: 10,
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 20,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

});