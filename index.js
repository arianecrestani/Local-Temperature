
const getGeonames = async (city) => {
    const baseUrl = "http://api.geonames.org/postalCodeSearchJSON?";
    const apiKey = "ariane";
  
    return await fetch(`${baseUrl}username=${apiKey}&placename=${city}`)
        .then((response) => response.json())  // const products = await response.json
        .catch((error) => console.log(error));
       
  };


getGeonames('berlin').then( (json) => {
    console.log(json);
})