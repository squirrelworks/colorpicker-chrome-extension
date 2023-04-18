export function getKey(myKey) {

    let colorList = JSON.parse(localStorage.getItem(myKey));

    if (colorList) {
        console.log(colorList);
    } else {
        console.log('no key in local storage');
        colorList = [];
    }

    return colorList;

}

export function storeDataPair(myKey, myValue) {
    //console.log('store', colorList);
    localStorage.setItem(myKey, JSON.stringify(myValue));

}

export function deleteKey(myKey) {
    localStorage.removeItem(myKey);
}

