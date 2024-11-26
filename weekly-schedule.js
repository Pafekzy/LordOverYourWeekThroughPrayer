const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentDay = "Sunday";  
let userActivities = JSON.parse(localStorage.getItem("userActivities")) || {};

 daysOfWeek.forEach(day => {
    if (!userActivities[day]) {
        userActivities[day] = [];
    }
});

 function navigateToDay(day) {
    currentDay = day;
    renderDay();
}

 function renderDay() {
    const activityContainer = document.getElementById("activity-container");
    const activities = userActivities[currentDay] || [];

    activityContainer.innerHTML = `
        <h2>${currentDay}</h2>
        <div id="navigation-buttons">
            ${daysOfWeek.map(day => `
                <button onclick="navigateToDay('${day}')">${day}</button>
            `).join('')}
        </div>
        <div id="activity-list">
            ${activities.map((activity, index) => `
                <div class="activity">
                    <span>${activity.name}</span>
                    ${renderStars(currentDay, index, activity.rating)}
                    <button onclick="deleteActivity('${currentDay}', ${index})">Delete</button>
                </div>
            `).join('')}
        </div>
        <input type="text" id="new-activity" placeholder="Add a new activity">
        <button onclick="addActivity()">Add Activity</button>
    `;
}

 function renderStars(day, index, currentRating) {
    return Array.from({ length: 5 }, (_, i) => `
        <span class="star ${i < currentRating ? 'selected' : ''}" onclick="rateActivity('${day}', ${index}, ${i + 1})">
            ${i < currentRating ? '⭐' : '☆'}
        </span>
    `).join('');
}

 function addActivity() {
    const newActivityInput = document.getElementById("new-activity");
    const newActivityName = newActivityInput.value.trim();

    if (newActivityName) {
        userActivities[currentDay].push({ name: newActivityName, rating: 0 });
        newActivityInput.value = "";  
        saveActivities();
        renderDay();
    } else {
        alert("Please enter a valid activity name.");
    }
}

function deleteActivity(day, index) {
    userActivities[day].splice(index, 1);
    saveActivities();
    renderDay();
}

 
function rateActivity(day, index, rating) {
    userActivities[day][index].rating = rating;
    saveActivities();
    renderDay();
}

 function saveActivities() {
    localStorage.setItem("userActivities", JSON.stringify(userActivities));
}

 navigateToDay(currentDay);
