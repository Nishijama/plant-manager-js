let PLANT_COLLECTION

if (localStorage.getItem('PLANT_COLLECTION')) {
        PLANT_COLLECTION = JSON.parse(localStorage.getItem('PLANT_COLLECTION'))
        console.log("I ran 1");
} else {
    PLANT_COLLECTION = []
    localStorage.setItem('PLANT_COLLECTION', JSON.stringify(PLANT_COLLECTION))
}


const plantCollection = document.getElementById("plant-collection")