let request = require("async-request"),
  response;
// call api from web api server
const getWeather = async (location) => {
  const key_succeed = "d7f9eb250aab42b4a7395944231308";
  const url = `https://api.weatherapi.com/v1/current.json?key=${key_succeed}&q=${location}&aqi=yes`;
  try {
    response = await request(url);
    const data = JSON.parse(response.body);
    const weather = {
      isSucceed: true,
      Celcius: data.current.temp_c,
      Fahrenheit: data.current.temp_f,
      precip_mm: data.current.precip_mm,
      precip_in: data.current.precip_in,
      cloud: data.current.cloud,
      wind_degree: data.current.wind_degree,
      country: data.location.country,
      region: data.location.region,
    };
    return weather;
  } catch (error) {
    return {
      isSucceed: false,
      error,
    };
  }
};

const express = require("express");
const app = express();
const port = 3000;

const path = require("path"); // static file (set up sử dụng đường dẫn tới các thư mục)

const pathPublic = path.join(__dirname, "./public");
app.use(express.static(pathPublic));
console.log(pathPublic);

app.set("view engine", "hbs");

app.get("/", async (req, res) => {
  const params = req.query;
  const location = params.address;
  const getData = await getWeather(location);
  console.log(getData);
  if (location) {
    res.render("weather", {
      // truyền dữ liệu qua hbs thông qua tham số thữ 2
      status: true,
      region: getData.region,
      country: getData.country,
      Celcius: getData.Celcius,
      wind_degree: getData.wind_degree,
      cloud: getData.cloud,
    });
  } else {
    res.render("weather", { status: false });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
