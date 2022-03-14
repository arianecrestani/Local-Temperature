const inputCity = document.getElementById("inputCity");
const generate = document.getElementById("generate");

const getCurrentWeather = async (city) => {
    const baseUrl = "http://api.weatherbit.io/v2.0/current?";
    const apiKey = "64e2aeb35084463da3c0fc13d427f7d5";
    const url = `${baseUrl}key=${apiKey}&include=minutely&city=${city}`;

    return await fetch(url)
        .then((response) => response.json())
        .then((json) => createCurrentTemp(json));
};

const generateButtonClick = () => {
    getCurrentWeather(inputCity.value).then((json) => updateUi(json));
};

generate.addEventListener("click", generateButtonClick);

const createCurrentTemp = (dataJs) => {
    return {
        currentTemp: dataJs.data[0].temp,
    };
};

const updateUi = (weather) => {
    inputCity.value = "";

    const currentTemp = document.getElementById("currentTemp");
    // const min_temp = document.getElementById('min_temp')

    currentTemp.innerHTML = `Today ${Math.ceil(weather.currentTemp)}°C`;
};

// const result = (dataJson) =>{

//     currentTemp : dataJson.data[0].temp;
