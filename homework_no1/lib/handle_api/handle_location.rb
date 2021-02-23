class HandleApi::HandleLocation
  require "net/http"
  require "json"

  def initialize()
    @location_uri = "https://get.geojs.io/v1/ip/geo.json"
  end

  def get_location()
    uri = URI(@location_uri)
    res = JSON.parse Net::HTTP.get(uri)
    return {
             lat: res["latitude"].to_f,
             lon: res["longitude"].to_f,
             city: res["city"],
             country: res["country"],
           }
  end
end
