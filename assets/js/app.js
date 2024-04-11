
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
        const foodBox = document.createElement('section');
        foodBox.className = 'foodBox';

        const dayTextNode = document.createTextNode(myDays[i]);
        const dishTextNode = document.createTextNode(myDish[i]);
        
        foodDay.appendChild(dayTextNode);
        foodDish.appendChild(dishTextNode);
        

        foodBox.appendChild(foodDay);
        foodBox.appendChild(foodDish);
        foodSection.appendChild(foodBox);
    }
}

GetFoodData(RecieveFoodData);

// Schedule API

function GetScheduleData(callback) {
    const ScheduleAPIURL = 'https://iws.itcn.dk/techcollege/schedules?departmentcode=smed';

    fetch(ScheduleAPIURL)
    .then(ScheduleResponse => {
        if(!ScheduleResponse.ok){
            throw new Error ('failed to fetch data. Status' + ScheduleResponse.status);
        }
        return ScheduleResponse.json();

    }) 
    .then(data => {
        console.log('fetched schedule data', data);
        callback(data);
    })
    .catch (error => {
        console.error('Error fetching schedule data:', error.message);
    });
}

function RecieveScheduleData(data) {
    let myTeam = data.value.map(info => info.Team);
    let myClassType = data.value.map (info => info.Education);
    let myEducation = data.value.map(info => info.Subject);
    let myClassTime = data.value.map(info => info.StartDate);
    let myClass = data.value.map(info => info.Room);

    createScheduleView(myTeam, myClass, myClassTime, myEducation, myClassType);
}

function createScheduleView(myTeam, myClass, myClassTime, myEducation, myClassType) {
    const ScheduleSection = document.getElementById('schedule');

    // Get the current time
    const currentTime = new Date();

    // Combine data into objects for easier sorting
    const classes = myTeam.map((team, index) => ({
        team: team,
        classType: myClassType[index],
        class: myClass[index],
        time: new Date(myClassTime[index]),
        education: myEducation[index]
    }));

    // Sort classes by time
    classes.sort((a, b) => a.time - b.time);

    // Find current and next classes for each team
    const currentAndNextClasses = {};
    for (const cls of classes) {
        if (!(cls.team in currentAndNextClasses)) {
            currentAndNextClasses[cls.team] = [];
        }
        if (cls.time >= currentTime && currentAndNextClasses[cls.team].length < 2) {
            currentAndNextClasses[cls.team].push(cls);
        }
    }

    // Display only 16 classes
    let displayedClassesCount = 0;
    for (const team in currentAndNextClasses) {
        for (const cls of currentAndNextClasses[team]) {
            if (displayedClassesCount >= 16) {
                break; // Stop iterating if 16 classes have been displayed
            }
            const { time, class: className, education } = cls;
            
            // Check if both className and education are defined
            if (className && education) {
                const hours = time.getHours();
                const minutes = time.getMinutes();
                const stringHours = String(hours).padStart(2, "0");
                const stringMinutes = String(minutes).padStart(2, "0");

                console.log(`Date of displayed class: ${time.toDateString()}`);

                const ClassBox = document.createElement('section');
                ClassBox.className = 'ClassBox';
                const ClassType = document.createElement('p');
                ClassType.className = 'ClassType';
                const ClassTime = document.createElement('p');
                ClassTime.className = 'ClassTime';
                const Team = document.createElement('p');
                Team.className = 'Team';
                const Subject = document.createElement('p');
                Subject.className = 'Subject';
                const Class = document.createElement('p');
                Class.className = 'Class';

                const TimeTextNode = document.createTextNode(`${stringHours}:${stringMinutes}`);
                const ClassTypeTextNode = document.createTextNode(cls.classType);
                const TeamTextNode = document.createTextNode(team);
                const ClassTextNode = document.createTextNode(className);
                const SubjectTextNode = document.createTextNode(education);

                ClassTime.appendChild(TimeTextNode);
                ClassType.appendChild(ClassTypeTextNode);
                Team.appendChild(TeamTextNode);
                Subject.appendChild(SubjectTextNode);
                Class.appendChild(ClassTextNode);


                ClassBox.appendChild(ClassTime);
                ClassBox.appendChild(ClassType);
                ClassBox.appendChild(Team);
                ClassBox.appendChild(Subject);
                ClassBox.appendChild(Class);
                ScheduleSection.appendChild(ClassBox);

                displayedClassesCount++;
            }
        }
        if (displayedClassesCount >= 16) {
            break; // Stop outer loop if 16 classes have been displayed
        }
    }
}

// Call GetScheduleData to start the process
GetScheduleData(RecieveScheduleData);
