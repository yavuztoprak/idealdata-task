import React from 'react'
import { View, Text, StyleSheet } from 'react-native'




export default function Tableheader({ headerItems }) {
    return (
        <View style={styles.headerContainer}>
            {
                headerItems.map((item) => {
                    return (
                        <View style={styles.cell}>
                            <Text style={styles.text}>{item}</Text>
                        </View>
                    )
                })
            }

        </View>)
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