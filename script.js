const EtchASketch = () => {
    function changeDimension() {
        clearGrid();

        let dimension = prompt("Enter dimension : ");

        if(!(Number.isInteger(dimension)) == false) {
            alert ("Invalid input. Should enter number between 1 and 64");
            return;
        } 

        if(dimension < 0 || dimension > 64) {
            alert ("Invalid input. Should enter number between 1 and 64");
            return;
        }

        let grid = document.getElementById("grid");
        grid.style.gridTemplateColumns = `repeat(${dimension}, auto)`;
        grid.style.gridTemplateRows = `repeat(${dimension}, auto)`;

        const once = {
            once : true
        };

        for(let i = 0; i < dimension * dimension ; i++) {
            let singleGrid = document.createElement("div");
            singleGrid.setAttribute("class", "grid-" + i);
            singleGrid.style.boxShadow = "0 0 0 1px #000";

            let colorSetting = getColorSetting();

            if(colorSetting == "assorted") {
                singleGrid.addEventListener("mouseenter", changeBackgroundColorToRandom);
            } else {
                singleGrid.addEventListener("mouseenter", changeBackgroundColorInIntensity);
            }
            
            grid.appendChild(singleGrid);
        }
    }

    function clearGrid() {
        const parent = document.getElementById("grid");
        while (parent.firstChild) {
            parent.firstChild.remove()
        }
    }

    function getColorSetting() {
        let colorSettings = document.getElementsByName("color-settings");

        let chosenColorSetting;
        for(let i = 0; i < colorSettings.length; i++) {
            if(colorSettings[i].checked == true) {
                chosenColorSetting = colorSettings[i];
            }
        }

        return chosenColorSetting.value;
    }

    function changeBackgroundColorToRandom() {
        let color = this.style.backgroundColor;

        if(!color) {
            let randomColor = Math.floor(Math.random()*16777215).toString(16);

            this.style.backgroundColor = `#${randomColor}`;
        } else {
            let darkenedColor = darken(color);

            this.style.backgroundColor = darkenedColor;
        }
    }

    function changeBackgroundColorInIntensity() {
        let color = this.style.backgroundColor;

        if(!color) {
            let pickedColor = document.getElementById("color-picker");
            this.style.backgroundColor = pickedColor.value;
        } else {
            let darkenedColor = darken(color);

            this.style.backgroundColor = darkenedColor;
        }
    }

    function showColorPicker() {
        let colorPicker = document.createElement("input");
        colorPicker.setAttribute("type", "color");
        colorPicker.setAttribute("id", "color-picker");

        let colorSettingsContainer = document.getElementById("color-settings-container");
        colorSettingsContainer.appendChild(colorPicker);
    }

    function removeColorPicker() {
        let picker = document.getElementById("color-picker");
        let colorSettingsContainer = document.getElementById("color-settings-container");
        colorSettingsContainer.removeChild(picker);
    }

    function darken(col) {
        let arr=[]; col.replace(/[\d+\.]+/g, function(v) { arr.push(parseFloat(v)); });
     
        let r = parseInt(arr[0]) - 26;
        if(r < 0) r = 0;

        let b = parseInt(arr[1]) - 26;
        if  (b < 0) b = 0;

        let g = parseInt(arr[2]) - 26;
        if (g < 0) g = 0;
    
        return `rgb(${r}, ${g}, ${b})`;
    }

    function init() {
        let changeDimensionButton = document.getElementById("change-dimension-button");
        changeDimensionButton.addEventListener("click", changeDimension);

        let colorPicker = document.getElementById("color-pick");
        colorPicker.addEventListener("click", showColorPicker);

        let assortedColorRadioBtn = document.getElementById("assorted");
        assortedColorRadioBtn.addEventListener("click", removeColorPicker);

        changeDimension();
    }

    init();
}

const etchASketch = EtchASketch();
