import React, { useEffect, useMemo, useReducer } from 'react';
import { Modal, Alert, View, Text, Button, StyleSheet, TextInput, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleTransaction } from '../../helper';
import { useIsFocused } from '@react-navigation/native';

export default function StockModal({ isVisible, onClose, stock }) {
    const [amount, setAmount] = React.useState(0);
    const [shouldRender, setShouldRender] = React.useState(false);

    const handleTrade = async (buyOrSell) => {
        const messages = await handleTransaction(buyOrSell, stock.symbol, amount, stock.sellPrice);
        setShouldRender(!shouldRender);
        Alert.alert(messages, messages);
    }

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Pressable style={styles.buttonClose} onPress={onClose}>
                        <Text style={styles.textStyle}>X</Text>
                    </Pressable>

                    <Data stock={stock} shouldRender={shouldRender} />

                    <TextInput
                        style={styles.input}
                        value={amount}
                        onChangeText={setAmount}
                        placeholder="Miktar"
                        keyboardType="numeric"
                    />
                    <Buttons handleTrade={handleTrade} />


                </View>
            </View>
        </Modal>
    )
}

const Data = ({ stock, shouldRender }) => {
    const [myAssets, setMyAssets] = React.useState();
    const [balance, setBalance] = React.useState(0);

    React.useEffect(() => {
        const fetchBalanceAndAssets = async () => {
            const storedBalance = await AsyncStorage.getItem('balance');
            const storedAssets = await AsyncStorage.getItem('myAssets');

            if (storedBalance !== null) {
                setBalance(parseInt(storedBalance).toFixed(2));
            }

            if (storedAssets !== null) {

                setMyAssets(JSON.parse(storedAssets));
            }
        };
        fetchBalanceAndAssets();
    }, [balance, shouldRender]);

    return (
        <>
            <Text style={styles.stockSymbol}>{stock?.symbol}</Text>
            <Text style={styles.stockPrice}>{
                myAssets &&
                Object.entries(myAssets).filter(([symbol]) => symbol === stock?.symbol).map(([symbol, value], index) => {
                    return (
                        <React.Fragment key={index}>
                            Sahip olunan : {JSON.stringify(value)}
                        </React.Fragment>
                    )
                })
            }</Text>
            <Text style={styles.stockPrice}>Şuanki Fiyat: {stock?.currentPrice}</Text>
            <Text style={styles.stockPrice}>Bakiye : {balance}</Text>
        </>
    )
}

const Buttons = ({ handleTrade }) => {
    return (
        <View style={styles.buttons}>
            <Pressable style={styles.buttonBuy} onPress={() => { handleTrade("buy"); }}>
                <Text style={styles.textStyle}>Al</Text>
            </Pressable>
            <Pressable style={styles.buttonSell} onPress={() => { handleTrade("sell"); }}>
                <Text style={styles.textStyle}>Sat</Text>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    stockSymbol: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    stockPrice: {
        fontSize: 16,
        color: '#888',
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: 20,
        marginTop: 20
    },
    buttons: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonClose: {
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        elevation: 2,
        alignSelf: 'flex-end',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonBuy: {
        backgroundColor: 'green',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginBottom: 10,
    },
    buttonSell: {
        backgroundColor: 'red',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
});