
class Plant {
    constructor({plantName, lastWatered, lastFertilized, wateringSchedule, fertilizingSchedule, notes}) {
        this.plantName = plantName;
        this.wateringSchedule = Number(wateringSchedule);
        this.fertilizingSchedule = Number(fertilizingSchedule);
        this.notes = notes;
        this.id = Math.floor(Math.random() * 9999);
        this.lastWatered = new Date(lastWatered);
        this.lastFertilized = new Date(lastFertilized);
        this.dateAdded = new Date();
        this.last
    }

    draw() {
    // create the HTML for signle plant
        const div = document.createElement('div')
        div.classList.add('plant-item')
        div.style.position = 'relative'
        div.innerHTML = `
        
        <img src="./potted-plant.png">
        <h2>${this.plantName}</h2>
        <p>Water me every: ${this.wateringSchedule} days</p>
        <p>Fertilize me every: ${this.fertilizingSchedule} days</p>
        <p>Water me on: ${this.addDays(this.lastWatered, this.wateringSchedule)}</p>
        <p>Fertilize me on: ${this.addDays(this.lastFertilized, this.fertilizingSchedule)}</p>
        `
        const removeButton = document.createElement('p')
        removeButton.innerHTML= "Remove"
        removeButton.classList = "remove-button"
        div.appendChild(removeButton)
        
        plantCollection.appendChild(div);

        //handle removing plant
        removeButton.addEventListener('click', (e) => {
            e.target.parentElement.remove();
            PLANT_COLLECTION.filter((obj) => {
                return obj.id !== this.id;
            })
        })
    }

    addDays (date, days) {
    // handle calculating next watering/fertilizng date
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result.toLocaleDateString();
    }
}


