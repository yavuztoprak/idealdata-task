import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';

export default function Hisse({ stock, onPress }) {


    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.cell}>
                    <Text style={styles.text}>
                        {stock.symbol}
                    </Text>
                </View>
                <View style={styles.cell}>
                    <Text style={styles.text}>
                        {stock.currentPrice}
                    </Text>
                </View>
                <View style={styles.cell}>
                    <Text style={styles.text}>
                        {stock.buyPrice}
                    </Text>
                </View>
                <View style={styles.cell}>
                    <Text style={styles.text}>
                        {stock.sellPrice}
                    </Text>
                </View>
                <View style={styles.cell}>
                    <Button title='Al/Sat' onPress={onPress} />
                </View>
            </View>

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