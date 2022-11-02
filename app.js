const PLANT_COLLECTION = []

const plantCollection = document.getElementById("plant-collection")
const addPlantButton = document.getElementById("add-plant-button")
const plantForm = document.getElementById("plant-form")
const modal = document.getElementById("modal")

addPlantButton.addEventListener('click', () => {
    modal.style.display = 'flex';
    window.addEventListener('keydown', (e) => {
       if (e.key === "Escape") {
        modal.style.display = 'none'
       }
    })

})

plantForm.addEventListener('submit', (e) => {
    //get values from the form
    const plantName = document.getElementById('plant-name-input').value;
    const wateringSchedule = document.getElementById('watering-time-input').value;
    const lastWatered = document.getElementById('watering-last-date').value;
    const lastFertilized = document.getElementById('fertilizing-last-date').value;
    const fertilizingSchedule = document.getElementById('fertilizing-time-input').value;
    const notes = document.getElementById('notes-input').value;
    // call function to create a Plant object and add it to the site
    addPlant({plantName, lastWatered, lastFertilized, wateringSchedule, fertilizingSchedule, notes});
    //hide the modal
    modal.style.display = 'none'
    // reset all form fields
    plantForm.reset();
    e.preventDefault();
}, false)

function addPlant(object) {
    const plant = new Plant(object);
    plant.add()
    PLANT_COLLECTION.push(plant)
    
}
