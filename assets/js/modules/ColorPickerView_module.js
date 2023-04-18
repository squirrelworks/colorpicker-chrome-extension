import * as colorPicker from './ColorPickerController_module.js';

let colorList = [];
let selectedColorLine = false;


let ShowColorListElement = null;
let colorListTools = null;



export function buildView(myApp) {

    console.log("build color picker view");

    //top tool section 

    const topToolSection = document.createElement('section');
    const getColorButton = document.createElement('button');
    getColorButton.id = 'getColorButton';
    getColorButton.addEventListener('click', colorPicker.getColor);

    topToolSection.appendChild(getColorButton);




    // color list section
    const colorListSection = document.createElement('section');
    colorListSection.id = 'colorListSection';

    ShowColorListElement = document.createElement('p');
    ShowColorListElement.id = 'ShowColorElement';

    colorListSection.appendChild(ShowColorListElement);
    // color list tools
    const colorListTools = document.createElement('section');
    colorListTools.id = 'colorListTools';
    colorListTools.classList.add('hidden');

    const copyColorButton = document.createElement('button');
    copyColorButton.id = 'copyColorButton';
    copyColorButton.innerText = 'Copy';
    copyColorButton.addEventListener('click', colorPicker.copyColors);

    const deleteColorButton = document.createElement('button');
    deleteColorButton.id = 'deleteColorButton';
    deleteColorButton.innerText = 'Delete';
    deleteColorButton.addEventListener('click', colorPicker.deleteColor);

    colorListTools.appendChild(copyColorButton);
    colorListTools.appendChild(deleteColorButton);

    colorListSection.appendChild(colorListTools);



    const getCssButton = document.createElement('button');
    getCssButton.id = 'getCssButton';
    getCssButton.addEventListener('click', colorPicker.createCssVars);



    const clearColorSetButton = document.createElement('button');
    clearColorSetButton.id = 'clearColorSet';
    clearColorSetButton.addEventListener('click', colorPicker.deleteMe);










    myApp.appendChild(topToolSection);
    myApp.appendChild(colorListSection);



}




export function showColors(colorList) {

    console.log(colorList);

    ShowColorListElement.innerHTML = '';
    selectedColorLine = false;
    toggleSelectedHighlight();
    colorList.map((myColor, index) => {


        let myColorElement = document.createElement('div');
        myColorElement.classList.add('colorLines');
        //myColorElement.classList.add('colorLines');
        myColorElement.dataset.index = `${index}`;
        myColorElement.dataset.colorValue = `${myColor}`;

        myColorElement.addEventListener('click', toggleSelectedHighlight);

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