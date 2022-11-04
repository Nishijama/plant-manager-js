
    // draw each plant from local storage
    for (const plant of PLANT_COLLECTION) {
        const newPlant = new Plant(plant);
        newPlant.draw()
    }

    const addPlantButton = document.getElementById("add-plant-button")
    const plantForm = document.getElementById("plant-form")
    const modal = document.getElementById("modal")


    // display plant adding window
    addPlantButton.addEventListener('click', () => {
        modal.style.display = 'flex';
        window.addEventListener('keydown', e => {
            if (e.key === "Escape") {
                modal.style.display = 'none'
            }
        })
        window.addEventListener('click', e => {
            if (e.target == modal) {
                modal.style.display = 'none'
            }
        })

    })

    plantForm.addEventListener('submit', e => {
        //get values from the form
        e.preventDefault();

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
    }, false)

    function addPlant(object) {
        const plant = new Plant(object);
        plant.draw()
        PLANT_COLLECTION.push(plant)
        localStorage.setItem('PLANT_COLLECTION', JSON.stringify(PLANT_COLLECTION))
    }


   function testingFunction() {
        for (let i = 15; i < 20; i++)
        {
            addPlant(
                {
                    plantName: `Test Plant ${i-15}`, 
                    lastWatered: `2022-10-${i}`, 
                    lastFertilized: `2022-10-${i}`, 
                    wateringSchedule: i, 
                    fertilizingSchedule: i*2, 
                    notes: "testing"
            });
        }
    }