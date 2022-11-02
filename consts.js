
if (!localStorage.getItem('PLANT_COLLECTION')){
    let emptyCollection = []
    localStorage.setItem('PLANT_COLLECTION', JSON.stringify(emptyCollection))
}

const PLANT_COLLECTION = JSON.parse(localStorage.getItem('PLANT_COLLECTION'))
const plantCollection = document.getElementById("plant-collection")