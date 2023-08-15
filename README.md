Khởi tạo nodejs --> Gọi Apis để lấy thông tin --> Xử lý dữ liệu đầu vào --> Hiển thị lên màn hình

Cách gọi api sử dụng async-request
let request = require("async-request"),
response;

```bash
const getData = async (location) => {
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
getData("Viet Nam")
  .then(weather=> {
    console.log(weather);
  })
  .catch(error => {
    console.log("Loi roi: ", error);
  });
```
