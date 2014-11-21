class Product < ActiveRecord::Base
  belongs_to :category
  belongs_to :firm
  cattr_accessor :skip_filter

  before_save :calculate_rub_price, unless: :skip_filter

  def self.update_if_exist(id, params)
    product = Product.where(id: id).first
    return false if product.blank?
    product.update(params)
  end

  def self.recalculate_by_usd_rate(usd, carts)
    products = Product.where(fixed_rub_price: false).all
    Product.skip_filter = true
    products.each do |p|
      p.update(price: ('%.2f' % (p.usd_price*usd)).to_f)
      carts.each do |cart|
        cart.positions.each do |pos|
          if p.id == pos.id
            pos.price = p.price
            pos.save
          end
        end
      end
    end
    Product.skip_filter = false
  end

  private

  def calculate_rub_price
    setting = Setting.first
    if setting.recalculatable && !self.fixed_rub_price && !self.usd_price.blank?
      self.price = ('%.2f' % (self.usd_price*setting.usd_rate)).to_f
      p self.price
    end
  end

end
