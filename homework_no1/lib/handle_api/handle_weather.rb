class HandleApi::HandleWeather
  require "net/http"
  require "json"

  def initialize(location)
    weather_key = "a319dfb801304e2e8b21b5a9d8ec6b25"
    @weather_uri = "https://api.weatherbit.io/v2.0/current?lat=#{location[:lat]}&lon=#{location[:lon]}&key=#{weather_key}"
  end

  def get_weather()
    uri = URI(@weather_uri)
    res = JSON.parse Net::HTTP.get(uri)
    data = res["data"][0]
    return {
             wind_speed: data["wind_spd"],
             wind_direction: data["wind_cdir_full"],
             sunset: data["sunset"],
             sunrise: data["sunrise"],
             weather: data["weather"],
             temperature: data["temp"],
             precipitation: data["precip"],
           }
  end
end
