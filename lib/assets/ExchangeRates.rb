# encoding: UTF-8
require 'net/http'
require 'uri'
require 'xmlsimple'

class ExchangeRates

  URL = 'http://www.cbr.ru/scripts/XML_daily.asp'
  SOURCE = 'ЦБ РФ'
  XML_FILE = 'exchange_rates.xml'
  XML_DIR = "/tmp/rates"

  attr_accessor :rates, :xml, :date, :data, :error

  def initialize date=Time.now.strftime("%d/%m/%Y")
    self.date = date
    self.rates = []
    fill_rates
  end

  def error?
    !self.error.nil?
  end

  def ok?
    self.error.nil?
  end

  def get_value_by_char_code char_code
    value = nil
    self.rates.each do |rate|
      if rate["CharCode"] == [char_code.to_s]
        value = rate["Value"][0]
        next
      end
    end
    value
  rescue Exception => e
    self.error = e.message
  end

  def source
    SOURCE
  end

  private

  def fill_rates
    read_xml
    parse_xml
    check_data

    self.rates = self.data['Valute'].map if ok?
  end

  def read_xml
    self.xml = render_to_string :file => File.join(XML_DIR, XML_FILE)
  rescue
    request_xml
  end

  def check_data
    if self.data["Date"] != self.date
      request_xml
      parse_xml
    end
  rescue Exception => e
    self.error = e.message
  end

  def save_xml
    FileUtils.remove_file(File.join(XML_DIR, XML_FILE)) if File.exists?(File.join(XML_DIR, XML_FILE))

    FileUtils.makedirs(XML_DIR) unless Dir.exists?(XML_DIR)

    File.open(File.join(XML_DIR, XML_FILE), 'w') do |f|
      f.write(self.xml.force_encoding("windows-1251"))
      f.close
    end
  end

  def request_xml
    uri = URI.parse(URL)
    params = {:date_req => self.date}

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Get.new(uri.path)
    request.set_form_data(params)
    request = Net::HTTP::Get.new(uri.path+ '?' + request.body)
    response = http.request(request)
    self.xml = response.body
    save_xml
  rescue Exception => e
    self.error = e.message
  end

  def parse_xml
    self.data = XmlSimple.xml_in(self.xml)
  rescue Exception => e
    self.error = e.message
  end

end