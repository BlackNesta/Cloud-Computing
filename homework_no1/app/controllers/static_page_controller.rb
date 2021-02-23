class StaticPageController < ApplicationController
  def home
    @location = HandleApi::HandleLocation.new.get_location
    @weather = HandleApi::HandleWeather.new(@location).get_weather
    @advice = HandleApi::HandleAdvice.new.get_advice
  end
end
