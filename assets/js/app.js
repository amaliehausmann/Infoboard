
function GetFoodData(callback) {
    const FoodAPIURL = 'https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json'

    fetch(FoodAPIURL)
    .then(FoodResponse => {
        if(!FoodResponse.ok){
            throw new Error ('failed to fetch data. Status' + FoodResponse.status);
        }
        
        return FoodResponse.json();

    }) 

    .then(data => {
        console.log('fetched food data', data);
        callback(data);
    })

    .catch (error => {
        console.error('Error fetching food data:', error.message);
    })
}

function RecieveFoodData(data) {
    let myDish = data.Days.map(Dayname => Dayname.Dish);
    let myDays = data.Days.map(DayName => DayName.DayName);
    createFoodView(myDays, myDish);
}

function createFoodView(myDays, myDish) {
    const foodSection = document.getElementById('food');
    
    for (let i = 0; i < myDays.length; i++) {
        const foodDay = document.createElement('p');
        foodDay.className = 'foodDay';
        const foodDish = document.createElement('p');
        foodDish.className = 'foodDish';
        
        const dayTextNode = document.createTextNode(myDays[i]);
        const dishTextNode = document.createTextNode(myDish[i]);
        
        foodDay.appendChild(dayTextNode);
        foodDish.appendChild(dishTextNode);
        
        foodSection.appendChild(foodDay);
        foodSection.appendChild(foodDish);
    }
}

GetFoodData(RecieveFoodData);
