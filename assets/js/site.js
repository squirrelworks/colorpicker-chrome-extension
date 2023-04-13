const eyeDropper = new EyeDropper();
const getColorButton = document.getElementById('getColorButton');
const ShowColorListElement = document.getElementById('ShowColorElement');



const colorListTools = document.getElementById('colorListTools');
const copyColorButton = document.getElementById('copyColorButton');
const deleteColorButton = document.getElementById('deleteColorButton');

copyColorButton.addEventListener('click', copyColors);
deleteColorButton.addEventListener('click', deleteColor);


const getCssButton = document.getElementById('getCssButton');
const getScssButton = document.getElementById('getScssButton');

getCssButton.addEventListener('click', createCssVars);
getScssButton.addEventListener('click', createScssVars);






let colorList = [];
let selectedColorLine = false;



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


function copyColors(event){

    let myColor=selectedColorLine.dataset.colorValue;
    navigator.clipboard.writeText(myColor);
}



function deleteColor(event){

    console.log(colorList);
    let myIndex=selectedColorLine.dataset.index;
    colorList.splice(myIndex,1);
    showColors();
    console.log(colorList);
}


