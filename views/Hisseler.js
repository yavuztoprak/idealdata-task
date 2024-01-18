import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Hisse from './components/Hisse';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StockModal from './components/Stockmodal';
import Tableheader from './components/Tableheader';

const hisselerHeader = [
    'Sembol',
    'Anlık',
    'Alış',
    'Satış',
    '',
];

export default function Hisseler({ navigation }) {
    const [stocks, setStocks] = React.useState([]);
    const [selectedStock, setSelectedStock] = React.useState(null);

    React.useEffect(() => {
        AsyncStorage.getItem('stocks').then((value) => {
            if (value !== null) {
                setStocks(JSON.parse(value).stocks);
                // console.log(JSON.parse(value).stocks);
            }
        });
    }, []);

    
    return (
        <View style={styles.container}>
            <Tableheader headerItems={hisselerHeader} />
            <View style={styles.divider} />
            <View style={styles.hisseList}>
                {
                    stocks?.map((stock) => {
                        return (
                            <>
                                <Hisse stock={stock} onPress={() => setSelectedStock(stock)}></Hisse>
                                <View style={styles.divider} />
                            </>
                        )
                    })
                }
            </View>
            <StockModal
                isVisible={selectedStock !== null}
                onClose={() => setSelectedStock(null)}
                stock={selectedStock}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },
    hisseList: {
        flex: 1,
        flexDirection: 'column',
    },
    divider: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 30,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
    },
});

