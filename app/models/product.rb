class Product < ActiveRecord::Base
  has_many :images, dependent: :destroy
  has_one :category


  def self.update_if_exist(id, params)
    product = Product.where(id: id).first
    return false if product.blank?
    product.update(params)
  end

end
