import * as colorPicker from './ColorPickerView_module.js';

export let colorList = [];

const paletteName = 'currentPalette';

const eyeDropper = new EyeDropper();



function openEyeDropper() {

    eyeDropper.open().then(selectedColor => {
        console.log(selectedColor) // { sRGBHex: '#008080' }

        colorList.push(selectedColor.sRGBHex);
        //storeMe();
        //LocalStorage.storeDataPair(paletteName, colorList);
        console.log(colorList);
        colorPicker.showColors(colorList);


    }).catch(() => {
        console.log('eye dropper cancelled')
    })

}



export function getColor() {
    console.log('eyedropper');
    openEyeDropper();
}


export function createCssVars() {

    let myCssText = '/*CSS color vars from color picker*/\n:root {\n';

    // --main - bg - color: brown;
    colorList.map((myColor, index) => {
        let myCssVar = `--color-${index + 1}:${myColor};\n`;
        myCssText += myCssVar;
    });

    myCssText += '}';

    navigator.clipboard.writeText(myCssText);
    console.log(myCssText);

}

export function createScssVars() {

    let myScssText = '/* SCSS color vars from color picker*/\n';

    // --main - bg - color: brown;
    colorList.map((myColor, index) => {
        let myScssVar = `$color-${index + 1}:${myColor};\n`;
        myScssText += myScssVar;
    });


    navigator.clipboard.writeText(myScssText);
    console.log(myScssText);
}


export function copyColors(event) {

    let myColor = selectedColorLine.dataset.colorValue;
    navigator.clipboard.writeText(myColor);
}



export function deleteColor(event) {

    console.log(colorList);
    let myIndex = selectedColorLine.dataset.index;
    colorList.splice(myIndex, 1);
    //storeMe();
    LocalStorage.storeDataPair(paletteName, colorList);
    showColors();
    console.log(colorList);
}






export function store(myItem) {
    console.log(myInput);
    myColorSets.push(myInput.value);


    LocalStorage.storeDataPair(paletteName, colorList);
}


export function getPalette() {

    colorList = JSON.parse(localStorage.getItem('lastPalette'));

    if (colorList) {
        console.log(colorList);
    } else {
        console.log('no color set in local storage');
        colorList = [];
    }

    colorPicker.showColors(colorList);

}

export function storeMe() {
    //console.log('store', colorList);
    localStorage.setItem('lastPalette', JSON.stringify(colorList));

}

export function deleteMe() {
    //localStorage.removeItem('lastPalette');
    LocalStorage.deleteKey(paletteName);
    colorList = [];
    colorPicker.showColors(colorList);
}
