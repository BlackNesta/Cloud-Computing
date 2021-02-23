class HandleApi::HandleAdvice
  require "net/http"
  require "json"

  def initialize()
    @advice_uri = "https://api.adviceslip.com/advice"
  end

  def get_advice()
    uri = URI(@advice_uri)
    res = JSON.parse Net::HTTP.get(uri)
    advice = res["slip"]
    return advice["advice"]
  end
end
