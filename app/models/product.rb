class Product < ActiveRecord::Base
  belongs_to :category
  belongs_to :firm


  def self.update_if_exist(id, params)
    product = Product.where(id: id).first
    return false if product.blank?
    product.update(params)
  end

end
