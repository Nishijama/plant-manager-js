
class Plant {
    constructor({id = Math.floor(Math.random() * 9999),plantName, lastWatered, lastFertilized, wateringSchedule, fertilizingSchedule, notes}) {
        this.plantName = plantName;
        this.wateringSchedule = Number(wateringSchedule);
        this.fertilizingSchedule = Number(fertilizingSchedule);
        this.notes = notes;
        this.id = id;
        this.lastWatered = this.trimDate(new Date(lastWatered));
        this.lastFertilized = this.trimDate(new Date(lastFertilized));
        this.nextWateringDate = this.addDays(this.lastWatered, this.wateringSchedule)
        this.nextFertilizingDate = this.addDays(this.lastFertilized, this.fertilizingSchedule)
    }

    draw() {
    // create the HTML for signle plant
        const plantDiv = document.createElement('div')
        plantDiv.classList.add('plant-item')
        plantDiv.style.position = 'relative'
        plantDiv.style.marginTop = "10vh"
        plantDiv.style.margin = "10vh 5vw"

        plantDiv.innerHTML = `
        <img src="./images/succulent.png" style="width: 250px; height: auto;">
        <h2>${this.plantName}</h2>
       <!-- <p>Water me every: ${this.wateringSchedule} days</p>
        <p>Fertilize me every: ${this.fertilizingSchedule} days</p>
        <p>Water me on: ${this.nextWateringDate.toLocaleDateString()}</p> -->
        `

        // watering row
        const wateringDiv = document.createElement('div')
        wateringDiv.style.display = 'flex'
        wateringDiv.style.alignItems = 'center'
        
            // info on next watering
            const watering_p = document.createElement('p')
            watering_p.innerText = this.getWateringDL()
            wateringDiv.appendChild(watering_p)

            // water button
            const waterButton = document.createElement('div')
            waterButton.innerHTML = `<img src="./images/watering-can (1).png" style="margin-left: 10px; width: 2.5vh; height: auto;">`
            wateringDiv.appendChild(waterButton)
        
        plantDiv.appendChild(wateringDiv)
        

        // fertilizing row
        const fertilizingDiv = document.createElement('div')
        fertilizingDiv.style.display = 'flex'
        fertilizingDiv.style.alignItems = 'center'
                        
            // info on next fertilizing
            const fertilizing_p = document.createElement('p')
            fertilizing_p.innerText = this.getFertilizingDL()
            fertilizingDiv.appendChild(fertilizing_p)
            
            // fertlize button
            const fertilizeButton = document.createElement('div')
            fertilizeButton.innerHTML = `<img src="./images/npk.png" style="margin-left: 10px; width: 2.5vh; height: auto;">`
            fertilizingDiv.appendChild(fertilizeButton)

        plantDiv.appendChild(fertilizingDiv)

        // remove button
        const removeButton = document.createElement('div')
        removeButton.innerHTML= `<img src="./images/billhook.png" style="width: 2.5vh; height: auto;">`
        removeButton.classList = "remove-button"
        plantDiv.appendChild(removeButton)
        
        plantCollection.appendChild(plantDiv);

        //handle removing plant
        removeButton.addEventListener('click', (e) => {
            e.target.parentElement.remove();
            let filtered = PLANT_COLLECTION.filter((obj) => {
                console.log(obj.id);
                console.log(this.id);
                return obj.id !== this.id;
            })
            // console.log(filtered);
            localStorage.setItem('PLANT_COLLECTION', JSON.stringify(filtered))
        })
    }
    getWateringDL() {
        if (this.nextWateringDate.toLocaleDateString() > this.trimDate(TODAY).toLocaleDateString()) {
            return `Water me in: ${(this.nextWateringDate - this.trimDate(TODAY)) / 8.64e+7 } days`
        } else if (this.nextWateringDate.toLocaleDateString() === this.trimDate(TODAY).toLocaleDateString()) {
            return "Water me TODAY!"
        }
    }

    getFertilizingDL() {
        if (this.nextFertilizingDate.toLocaleDateString() > this.trimDate(TODAY).toLocaleDateString()) {
            return `Fertilize me in: ${(this.nextFertilizingDate - this.trimDate(TODAY)) / 8.64e+7 } days`
        } else if (this.nextFertilizingDate.toLocaleDateString() === this.trimDate(TODAY).toLocaleDateString()) {
            return "Fertilize me TODAY!"
        }
    }


    addDays (date, days) {
    // handle calculating next watering/fertilizng date
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    trimDate(date) {
        //remove time (hourse, minutes, seconds, miliseconds) from the date
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
}


