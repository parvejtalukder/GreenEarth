function getElement(id) {
return document.getElementById(id);
}
let isOn = 0;
// Function to handle click event and show menu
function manuClicked(id1, id2) {
    getElement(id1).addEventListener("click", (event) => {
        if (isOn == 0) {
            getElement(id2).style.display = "block"; 
            isOn++;
        } else {
            getElement(id2).style.display = "none";
            isOn = 0;
        }
});
}

let isOpen = 0;
// Function to handle click event and show menu
function catClicked(id1, id2) {
    getElement(id1).addEventListener("click", (event) => {
        if (isOpen == 0) {
            getElement(id2).style.display = "block"; 
            // document.getElementById("manuAlert").classList.add() = "-rotate-90";
            isOpen++;
        } else {
            getElement(id2).style.display = "none";
            // document.getElementById("manuAlert").classList.remove() = "-rotate-90";
            isOpen = 0;
        }
});
}
 
manuClicked("mobileManu", "manu");
catClicked("catMob", "catForMob");