class Cart < ActiveRecord::Base
  belongs_to :user
  has_many :positions, dependent: :destroy

  def self.aclual(user_id)
    cart = Cart.where(user_id: user_id, confirmed: false).first
    cart = Cart.create(user_id: user_id) if cart.blank?
    cart
  end

  def self.add_position(product_id, user_id)
    cart = Cart.aclual(user_id)
    positions = cart.positions.where(product_id: product_id)
    return {already: true} unless positions.blank?
    cart.positions << Position.new(product_id: product_id)
    {success: true, position: Position.where(product_id: product_id).first, cart: cart}
  end

  def self.recalculate_by_usd_rate(usd, carts)

  end

end
