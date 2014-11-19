class Product < ActiveRecord::Base
  belongs_to :category
  belongs_to :firm


  def self.update_if_exist(id, params)
    product = Product.where(id: id).first
    return false if product.blank?
    product.update(params)
  end

  def self.recalculate_by_usd_rate(usd, positions)
    products = Product.where(fixed_rub_price: false).all
    products.each do |p|
      p.update(price: ('%.2f' % p.usd_price*usd).to_f)
      positions.each do |pos|
        if p.id == pos.id
          pos.price = p.price
          pos.save
        end
      end
    end
  end

end
