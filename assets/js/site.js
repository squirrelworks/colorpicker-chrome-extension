
import * as ColorPickerView from "./modules/ColorPickerView_module.js";
import * as ColorEditView from "./modules/colorEditView_module.js";




initApp();



function initApp() {
    const appElement = document.getElementById('myApp');

    ColorPickerView.buildView(appElement);
    //ColorEditView.initEditView(appElement);
}

