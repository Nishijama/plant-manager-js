
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


    // create the HTML for signle plant
    draw() {
        const plantDiv = document.createElement('div')
        plantDiv.classList.add('plant-item')
        plantDiv.innerHTML = `
        <img class="plant-icon" src="./images/plants/${this.plantType}.png">
        <h2>${this.plantName}</h2>
        `
        // create watering and fertilizing info text
        const infoDiv = document.createElement('div')
        infoDiv.classList.add('info-div')
        
        // use method defined below to create each row with all the functionality
        const wateringRow = this.createWatteringRow(this)
        const fertilizingRow = this.createFertilizingRow(this)
        
        // append both rows to the grid element
        infoDiv.append(...wateringRow, ...fertilizingRow)
        plantDiv.appendChild(infoDiv)

        // create a detail box
        const detailBox = this.createDetailBox(this)

        plantDiv.appendChild(detailBox)
        
        
        // show detail box      
        plantDiv.addEventListener('click', (e) => {
            e.stopImmediatePropagation()
            detailBox.style.display = 'block'
        })

        // append the plant to the collection
        plantCollection.appendChild(plantDiv);
    }
    // create html for watering info
    createWatteringRow(obj) {
        // watering row
        const wateringDiv = document.createElement('div')

        wateringDiv.classList.add('water-fertilize-info')

            // info on next watering
            const watering_p = document.createElement('p')
            watering_p.style.display = 'inline-block'
            watering_p.style.width = 'fit-content'
            watering_p.innerText = obj.getWateringDL()
            wateringDiv.appendChild(watering_p)

            // water button
            const waterButton = document.createElement('div')
            waterButton.classList.add('small-button')
            waterButton.innerHTML = `<img src="./images/watering-can (1).png">`
            
            waterButton.addEventListener('click', (e) => {
                e.stopImmediatePropagation();
                obj.lastWatered = obj.trimDate(TODAY);
                obj.nextWateringDate = obj.addDays(obj.lastWatered, obj.wateringSchedule)
                
                // handle updating local storage with new watering data
                for (let item of PLANT_COLLECTION) {
                        if (item.id === obj.id){
                        let index = (PLANT_COLLECTION.indexOf(item));
                        PLANT_COLLECTION[index].lastWatered = obj.lastWatered
                        PLANT_COLLECTION[index].nextWateringDate = obj.nextWateringDate
                    }
                }
                localStorage.setItem('PLANT_COLLECTION', JSON.stringify(PLANT_COLLECTION));
                
                // update DOM after updating date
                watering_p.innerText = obj.getWateringDL();
            })
            // wateringDiv.appendChild(waterButton)
        return [watering_p, waterButton]
    }
    // create html for fertilizing info
    createFertilizingRow(obj) {
        // info on next fertilizing
        const fertilizing_p = document.createElement('p')
        fertilizing_p.style.display = 'inline-block'
        fertilizing_p.style.width = 'fit-content'
        fertilizing_p.innerText = obj.getFertilizingDL()
        
        // fertlize button
        const fertilizeButton = document.createElement('div')
        fertilizeButton.innerHTML = `<img src="./images/npk.png">`
        fertilizeButton.classList.add('small-button')
        fertilizeButton.addEventListener('click', (e) => {
            e.stopImmediatePropagation();
            obj.lastFertilized = obj.trimDate(TODAY);
            obj.nextFertilizingDate = obj.addDays(obj.lastFertilized, obj.fertilizingSchedule)
            
            // handle updating local storage with new watering data
            for (let item of PLANT_COLLECTION) {
                if (item.id === obj.id){
                    let index = (PLANT_COLLECTION.indexOf(item));
                    PLANT_COLLECTION[index].lastFertilized = obj.lastFertilized
                    PLANT_COLLECTION[index].nextFertilizingDate = obj.nextFertilizingDate
                }  
            }
            // update DOM after updating date
            fertilizing_p.innerText = obj.getFertilizingDL()
            localStorage.setItem('PLANT_COLLECTION', JSON.stringify(PLANT_COLLECTION));
        })
        return [fertilizing_p, fertilizeButton];
            
    }
    // create html for description box for the plant
    createDetailBox(obj) {
        const popUpDiv = document.createElement('div');
        popUpDiv.classList.add('plant-info-popup')
        popUpDiv.innerHTML = `
        <p><b>${obj.plantName}</b></p>
        <p>${obj.notes}</p>
        <p>Water every ${obj.wateringSchedule} days</p>
        <p>Fertilize every ${obj.fertilizingSchedule} days</p>
        `

        // create close button
        const closeBtn = document.createElement('span')
        closeBtn.classList.add('close')
        closeBtn.innerHTML = '&times;'
        
        closeBtn.addEventListener('click', e => {
            e.stopImmediatePropagation()
            console.log(e.target.parentElement.style.display);
            e.target.parentElement.style.display = 'none'
            console.log(e.target.parentElement.style.display);
        })
        popUpDiv.appendChild(closeBtn)

        // create remove button
        const removeButton = document.createElement('p')
        removeButton.innerText = "Remove"
        removeButton.classList = "remove-button"
        popUpDiv.appendChild(removeButton)
        //handle removing plant
        removeButton.addEventListener('click', e => {
            e.target.parentElement.parentElement.remove();
            let filtered = PLANT_COLLECTION.filter(obj => obj.id !== obj.id);
            PLANT_COLLECTION = filtered;
            localStorage.setItem('PLANT_COLLECTION', JSON.stringify(filtered));
            })
        return popUpDiv;
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

