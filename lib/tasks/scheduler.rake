require 'net/http'

task :recalculate_exchange_rates => :environment do
  xml_url = 'http://www.cbr.ru/scripts/XML_daily.asp'
  url = URI.parse(xml_url)
  req = Net::HTTP::Get.new(url.to_s)
  res = Net::HTTP.start(url.host, url.port) {|http|
    http.request(req)
  }
  xml = Hash.from_xml(res.body)
  valutes = xml['ValCurs']['Valute']
  usd = nil
  valutes.each do |v|
    if v['CharCode'] == 'USD'
      usd = (v['Value'].sub! ',', '.').to_f
    end
  end
  p usd
  if usd != 0.0 && !usd.blank?
    s = Setting.first
    s.update(usd_rate: usd) unless s.blank?
  end
end