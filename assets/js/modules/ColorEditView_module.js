import * as EditController from './colorEditController_module.js'


export function initEditView(myApp) {
    myApp.innerHTML = '';

    const myColorWheel = document.createElement('img');
    myColorWheel.id = 'colorWheel';
    myColorWheel.src = 'assets/img/colorWheel.png';

    myApp.appendChild(myColorWheel);

}