
class Plant {
    constructor({id = Math.floor(Math.random() * 9999),plantName, plantType, lastWatered, lastFertilized, wateringSchedule, fertilizingSchedule, notes}) {
        this.plantName = plantName;
        this.plantType = plantType;
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
        
        console.log(this.plantType);

        plantDiv.innerHTML = `
        <img src="./images/plants/${this.plantType}.png" style="width: 250px; height: auto;">
        <h2>${this.plantName}</h2>
        `

        // const nextWateringDate_p = document.createElement('p')
        // nextWateringDate_p.innerText = `Fertilize me on: ${this.nextFertilizingDate.toLocaleDateString()}`

        // const nextFertilizingDate_p = document.createElement('p')
        // nextFertilizingDate_p.innerText = `Water me on: ${this.nextWateringDate.toLocaleDateString()}`


        // watering row
        const wateringDiv = document.createElement('div')
        wateringDiv.style.display = 'grid'
        wateringDiv.style.gridTemplateColumns = 'auto auto'
        
            // info on next watering
            const watering_p = document.createElement('p')
            watering_p.innerText = this.getWateringDL()
            wateringDiv.appendChild(watering_p)

            // water button
            const waterButton = document.createElement('div')
            waterButton.classList.add('small-button')
            waterButton.innerHTML = `<img src="./images/watering-can (1).png" style="width: 2.5vh; height: auto;">`
            
            waterButton.addEventListener('click', () => {
                this.lastWatered = this.trimDate(TODAY);
                this.nextWateringDate = this.addDays(this.lastWatered, this.wateringSchedule)
                
                // handle updating local storage with new watering data
                for (let item of PLANT_COLLECTION) {
                        if (item.id === this.id){
                        let index = (PLANT_COLLECTION.indexOf(item));
                        PLANT_COLLECTION[index].lastWatered = this.lastWatered
                        PLANT_COLLECTION[index].nextWateringDate = this.nextWateringDate
                    }
                }
                localStorage.setItem('PLANT_COLLECTION', JSON.stringify(PLANT_COLLECTION));
                
                // update DOM
                // nextWateringDate_p.innerText = `Water me on: ${this.nextWateringDate.toLocaleDateString()}`;
                watering_p.innerText = this.getWateringDL();
            })
            wateringDiv.appendChild(waterButton)
        
        

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
        fertilizeButton.innerHTML = `<img src="./images/npk.png" style="width: 2.5vh; height: auto;">`
        fertilizeButton.classList.add('small-button')
        fertilizeButton.addEventListener('click', () => {
                this.lastFertilized = this.trimDate(TODAY);
                this.nextFertilizingDate = this.addDays(this.lastFertilized, this.fertilizingSchedule)
                
                // handle updating local storage with new watering data
                for (let item of PLANT_COLLECTION) {
                    if (item.id === this.id){
                        let index = (PLANT_COLLECTION.indexOf(item));
                        PLANT_COLLECTION[index].lastFertilized = this.lastFertilized
                        PLANT_COLLECTION[index].nextFertilizingDate = this.nextFertilizingDate
                    }  
                }

                localStorage.setItem('PLANT_COLLECTION', JSON.stringify(PLANT_COLLECTION));
                
                // update DOM
                // nextFertilizingDate_p.innerText = `Fertilize me on: ${this.nextFertilizingDate.toLocaleDateString()}`;
                fertilizing_p.innerText = this.getFertilizingDL()

            })
            fertilizingDiv.appendChild(fertilizeButton)
            
            
        // remove button
        const removeButton = document.createElement('img')
        removeButton.src = "./images/billhook.png"
        removeButton.classList = "remove-button"
            
        // assemble plantDiv element and append it to the collection
        // plantDiv.appendChild(nextWateringDate_p)
        // plantDiv.appendChild(nextFertilizingDate_p)
        plantDiv.appendChild(wateringDiv)
        plantDiv.appendChild(fertilizingDiv)
        plantDiv.appendChild(removeButton)


        plantDiv.addEventListener('click', () => {
            console.log('ran');
            const popUpDiv = document.createElement('div');
            popUpDiv.classList.add('plant-info-popup')
            popUpDiv.innerHTML = `
            <p>Water me every: ${this.wateringSchedule} days</p>
            <p>Fertilize me every: ${this.fertilizingSchedule} days</p>
            <p>${this.notes}</p>

            `
            plantDiv.appendChild(popUpDiv)
            setTimeout(()=>{
                popUpDiv.remove()
            }, 3000)
        })

        plantCollection.appendChild(plantDiv);

        //handle removing plant
        removeButton.addEventListener('click', e => {
            e.target.parentElement.remove();
            let filtered = PLANT_COLLECTION.filter(obj => obj.id !== this.id);
            PLANT_COLLECTION = filtered;
            localStorage.setItem('PLANT_COLLECTION', JSON.stringify(filtered));
        })
    }

    // calculate next watering date
    getWateringDL() {
        if (this.nextWateringDate > this.trimDate(TODAY)) {
            return `Water me in: ${(this.nextWateringDate - this.trimDate(TODAY)) / 8.64e+7 } days`
        } else if (this.nextWateringDate <= this.trimDate(TODAY)) {
            return "Water me TODAY!"
        }
    }

    // calculate next fertilizing date
    getFertilizingDL() {
        if (this.nextFertilizingDate > this.trimDate(TODAY)) {
            return `Fertilize me in: ${(this.nextFertilizingDate - this.trimDate(TODAY)) / 8.64e+7 } days`
        } else if (this.nextFertilizingDate <= this.trimDate(TODAY)) {
            return "Fertilize me TODAY!"
        }
    }

    // add days to a date
    addDays (date, days) {
    // handle calculating next watering/fertilizng date
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    // trim date to remove time
    trimDate(date) {
        //remove time (hourse, minutes, seconds, miliseconds) from the date
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
}

