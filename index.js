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

const getImagePlace = async (city) => {
    const baseUrl = "https://pixabay.com/api/?";
    const apiKey = "21079899-b6d36b2d97a91f9583927dd0f";

    return await fetch(
        `${baseUrl}key=${apiKey}&q=${city}&category=buildings&orientation=horizontal&per_page=3`
    )
        .then((response) => response.json())
        .then((json) => createPixabayDataFromJson(json));
};


const generateButtonClick = () => {
    getCurrentWeather(inputCity.value).then((json) => updateUi(json));
    getImagePlace(inputCity.value).then((json) => updateImg(json));
    cityName();
};

const cityName = () => {
    const city = document.getElementById("entryCity");
    city.innerHTML = inputCity.value;
};

generate.addEventListener("click", generateButtonClick);

const createCurrentTemp = (dataJs) => {
    return {
        currentTemp: dataJs.data[0].temp,
        description: dataJs.data[0].weather.description,
        icon: dataJs.data[0].weather.icon,
        timezone: dataJs.data[0].timezone,
    };
};

const createPixabayDataFromJson = (dataJs) => {
    return {
        placeImage: dataJs.hits[0].webformatURL,
        tags: dataJs.hits[0].tags,
    };
};

const updateUi = (weather) => {
    inputCity.value = "";

    const currentTemp = document.getElementById("currentTemp");
    const description = document.getElementById("description");
    const iconWeather = document.getElementById("icon");
    const timezone = document.getElementById("timezone");

    currentTemp.innerHTML = `Today ${Math.ceil(weather.currentTemp)}°C`;
    description.innerHTML = weather.description ? weather.description : "";
    iconWeather.src = `https://www.weatherbit.io/static/img/icons/${weather.icon}.png`;
    timezone.innerHTML = weather.timezone ? weather.timezone : "";

}

const updateImg = (picture) => {
    const placeImage = document.getElementsByClassName("placeImage")[0];
    const tags = document.getElementById("descriptionImg");

    placeImage.src = picture.placeImage;
    tags.innerHTML = picture.tags ? picture.tags : "";
};
