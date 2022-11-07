
if (!localStorage.getItem('PLANT_COLLECTION')){
    localStorage.setItem('PLANT_COLLECTION', JSON.stringify([]))
}

let PLANT_COLLECTION = JSON.parse(localStorage.getItem('PLANT_COLLECTION'))
const plantCollection = document.getElementById("plant-collection")
const TODAY = new Date();