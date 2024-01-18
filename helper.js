import AsyncStorage from '@react-native-async-storage/async-storage';

export async function handleTransaction(type, symbol, amount, price) {
    let myAssets = await AsyncStorage.getItem('myAssets');
    if (myAssets === null) {
        await AsyncStorage.setItem('myAssets', JSON.stringify({}));
        myAssets = "{}";
    }
    myAssets = JSON.parse(myAssets);

    let balance = await AsyncStorage.getItem('balance');
    balance = balance ? parseInt(balance) : 0;

    amount = parseInt(amount);
    price = parseFloat(price);
    if (amount < 1) {
        return 'Geçersiz miktar !';
    }

    if (isNaN(amount) || isNaN(price)) {
        return "Invalid amount or price";
    }

    if (type === 'buy') {
        if (balance < price * amount) {
            return 'Yetersiz Bakiye !';
        }

        if (myAssets[symbol]) {
            myAssets[symbol] += amount;

        } else {
            myAssets[symbol] = amount;

        }
        balance -= price * amount;

    } else if (type === 'sell') {
        if (!myAssets[symbol] || myAssets[symbol] < amount) {
            return 'Yetersiz hisse adedi !';
        }
        myAssets[symbol] -= amount;
        balance += price * amount;
    }



    await AsyncStorage.setItem('myAssets', JSON.stringify(myAssets));
    await AsyncStorage.setItem('balance', balance.toString());
    return "İşlem Başarılı !";
}