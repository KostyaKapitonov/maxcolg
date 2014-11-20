class Cart < ActiveRecord::Base
  belongs_to :user
  has_many :positions, dependent: :destroy

  def self.actual(user_id, usd_rate = nil)
    cart = Cart.where(user_id: user_id, confirmed: false).first
    if cart.blank?
      usd_rate = usd_rate || Setting.first.usd_rate
      cart = Cart.create(user_id: user_id, usd_rate: usd_rate)
    end
    cart
  end

  def self.add_position(product_id, user_id)
    usd_rate = Setting.first.usd_rate
    cart = Cart.actual(user_id, usd_rate)
    positions = cart.positions.where(product_id: product_id)
    return {already: true} unless positions.blank?
    cart.positions << Position.new(product_id: product_id)
    {success: true, position: Position.where(product_id: product_id).first, cart: cart}
  end

end
