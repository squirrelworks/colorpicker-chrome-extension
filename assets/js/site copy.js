import * as LocalStorage from "./modules/localStorage_module.js";
import * as colorPicker from './modules/ColorPickerController_module.js';
import * as ColorPickerView from "./colorPickerView_module.js";

const paletteName = 'currentPalette';

const eyeDropper = new EyeDropper();



let colorList = [];
let selectedColorLine = false;


initApp();

function initApp() {

    //getPalette();
    colorList = LocalStorage.getKey('paletteName');

    ColorPickerView.buildView(document.getElementById('myApp'));

}


}


document.addEventListener('keypress', event => {

    if (event.shiftKey) {
        if (event.key === "S") {
            openEyeDropper();
        }
    }

})







getColorButton.addEventListener('click', openEyeDropper);

function openEyeDropper() {


    eyeDropper.open().then(selectedColor => {
        console.log(selectedColor) // { sRGBHex: '#008080' }

        colorList.push(selectedColor.sRGBHex);
        //storeMe();
        LocalStorage.storeDataPair(paletteName, colorList);
        showColors();


    }).catch(() => {
        console.log('eye dropper cancelled')
    })

}


function showColors() {
    ShowColorListElement.innerHTML = '';
    selectedColorLine = false;
    toggleSelectedHighlight();
    colorList.map((myColor, index) => {


        let myColorElement = document.createElement('div');
        myColorElement.classList.add('colorLines');
        //myColorElement.classList.add('colorLines');
        myColorElement.dataset.index = `${index}`;
        myColorElement.dataset.colorValue = `${myColor}`;

        myColorElement.addEventListener('click', toggleSelected);

        let myColorTile = document.createElement('div');
        myColorTile.classList.add('colorTiles');
        myColorTile.style.backgroundColor = `${myColor}`;

        let myColorText = document.createElement('div');
        myColorText.innerText = `${myColor}`;

        myColorElement.appendChild(myColorTile);
        myColorElement.appendChild(myColorText);

        ShowColorListElement.appendChild(myColorElement);

    });
    //createCssVars();

}





function toggleSelected(event) {


    let newSelection = event.currentTarget;
    // clear selection
    let myLines = document.getElementsByClassName('colorLines');

    for (const myLine of myLines) {
        myLine.classList.remove('selectedElement');
    }


    if (selectedColorLine == newSelection) {
        selectedColorLine = false;
    } else {
        newSelection.classList.toggle('selectedElement');
        selectedColorLine = newSelection;
    }

    toggleSelectedHighlight();

}

function toggleSelectedHighlight() {
    // open tools if selection
    if (selectedColorLine) {
        if (colorListTools.classList.contains('hidden')) {
            colorListTools.classList.remove('hidden');
        }
    } else {
        if (!colorListTools.classList.contains('hidden')) {
            colorListTools.classList.add('hidden');
        }
    }
}

* /

function createCssVars() {

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

function createScssVars() {

    let myScssText = '/* SCSS color vars from color picker*/\n';

    // --main - bg - color: brown;
    colorList.map((myColor, index) => {
        let myScssVar = `$color-${index + 1}:${myColor};\n`;
        myScssText += myScssVar;
    });


    navigator.clipboard.writeText(myScssText);
    console.log(myScssText);
}


function copyColors(event) {

    let myColor = selectedColorLine.dataset.colorValue;
    navigator.clipboard.writeText(myColor);
}



function deleteColor(event) {

    console.log(colorList);
    let myIndex = selectedColorLine.dataset.index;
    colorList.splice(myIndex, 1);
    //storeMe();
    LocalStorage.storeDataPair(paletteName, colorList);
    showColors();
    console.log(colorList);
}






function store(myItem) {
    console.log(myInput);
    myColorSets.push(myInput.value);


    LocalStorage.storeDataPair(paletteName, colorList);
}


function getPalette() {

    colorList = JSON.parse(localStorage.getItem('lastPalette'));

    if (colorList) {
        console.log(colorList);
    } else {
        console.log('no color set in local storage');
        colorList = [];
    }

    showColors();

}

function storeMe() {
    //console.log('store', colorList);
    localStorage.setItem('lastPalette', JSON.stringify(colorList));

}

function deleteMe() {
    //localStorage.removeItem('lastPalette');
    LocalStorage.deleteKey(paletteName);
    colorList = [];
    showColors();
}


