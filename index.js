    const weatherForm=document.querySelector(".weatherForm");
    const cityInput=document.querySelector(".cityInput");
    const card=document.querySelector(".card");
    const APIKEY="06fe26d8cd42dde2ac7f76dc5c1d1173";


    weatherForm.addEventListener("submit",async event => {
    event.preventDefault();
    const city=cityInput.value;

    if(city){
    try{
        const weatherData=await getweatherData(city);
        displayweatherData(weatherData);
    }
    catch(Error){
        displayError(Error);
    }

    }
    else{
    displayError("please enter the city");
    }
    });

    async function getweatherData(city){
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`;
    const response=await fetch(apiurl);

    if(!response.ok){
    throw new Error("Could not fetch data");
    }
    return await response.json();
    }

    function displayweatherData(Data){

    const {name:city,
    main:{temp,humidity}, 
        weather:[{description,id}]}=Data;
    card.textContent="";
    card.style.display="flex";    

    const locationDisplay=document.createElement("h1");
    const tempDisplay=document.createElement("p");
    const humidityDisplay=document.createElement("p");
    const descDisplay=document.createElement("p");
    const weatherEmoji=document.createElement("p");

    locationDisplay.textContent=city;
    locationDisplay.classList.add("locationDisplay");
    card.appendChild(locationDisplay);

    tempDisplay.textContent=`${(temp - 273.15).toFixed(1)}℃`;
    tempDisplay.classList.add("tempDisplay");
    card.appendChild(tempDisplay);

    humidityDisplay.textContent=`Humidity:${humidity}%`;
    humidityDisplay.classList.add("humidityDisplay");
    card.appendChild(humidityDisplay);

    descDisplay.textContent=`${description}`;
    descDisplay.classList.add("descDisplay");
    card.appendChild(descDisplay);

    weatherEmoji.textContent=getweatherEmoji(id);
    weatherEmoji.classList.add("weatherEmoji");
    card.appendChild(weatherEmoji);
    }

    function getweatherEmoji(id){

    switch(true){
    case (id >= 200 && id < 300):
    return "⚡";
    case (id >= 300 && id < 400):
    return "🌧";
    case (id >= 500 && id < 600):
    return "⚡";
    case (id >= 600 && id < 700):
    return "❄";
    case (id >= 700 && id < 800):
    return "🌦";
    case(id === 800):
    return "☀";
    case (id >= 801 && id < 800):
    return "☁";
    default:
        return "☁";

    }

    }

    function displayError(message){
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add(".errorDisplay");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);
    }