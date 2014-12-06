class Position < ActiveRecord::Base
  belongs_to :cart
  belongs_to :product
  before_create :is_product_actual?
  before_update :is_product_actual?, :fill_data

  private

  def is_product_actual?
    !self.product.blank? && self.product.exist && !self.product.hidden && self.count > 0
  end

  def fill_data
    self.name = self.product.name
    self.price = self.product.price
    self.sum = self.price*self.count
  end
end
