class Cart < ActiveRecord::Base
  belongs_to :user
  belongs_to :zone
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

  def self.validate_and_create(params, current_user)
    is_invalid = params[:cart][:zone_id].blank?
    prod_ids = []
    pos_ids = []
    cart_ids = []
    params[:cart][:positions].each do |pos|
      break if is_invalid
      pos[:count] = pos[:count].to_i
      is_invalid = pos[:product_id].blank? || pos[:count] < 1 unless is_invalid
      prod_ids << pos[:product_id]
      pos_ids << pos[:id]
      cart_ids << pos[:cart_id]
    end
    not_found if is_invalid
    positions = Position.where(id: pos_ids).all
    is_invalid = positions.size != params[:cart][:positions].size
    not_found if is_invalid
    cart_id = positions[0].cart_id
    positions.each do |pos|
      is_invalid = pos.cart_id != cart_id unless is_invalid
    end
    not_found if is_invalid
    cart = Cart.where(id: cart_ids).all
    is_invalid = cart.size != 1
    cart = cart[0]
    not_found if is_invalid
    is_invalid = cart.id != Cart.actual(current_user.id).id
    not_found if is_invalid
    zone = Zone.where(id: params[:cart][:zone_id]).first
    is_invalid = zone.blank?
    not_found if is_invalid
    products = Product.where(id: prod_ids).all
    is_invalid = products.size != prod_ids.size
    not_found if is_invalid
    old_data = false
    prod_ids_old = []
    products.each do |prod|
      if prod.hidden || !prod.exist
        prod_ids_old << prod.id
        old_data = true
      end
    end
    if old_data
      Position.where(product_id: prod_ids_old).destroy_all
      return {success: false, msg: 'old_data', ids: prod_ids_old}
    end
    params[:cart][:positions].each do |pos|
        positions.update(pos[:id], count: pos[:count])
    end
    positions.reload
    sum = zone.price
    positions.each do |pos|
      sum += pos.sum
    end
    cart.update(confirmation_date: DateTime.now, total_price: sum, zone_id: zone.id, confirmed: true, delivery_price: zone.price, usd_rate: Setting.first.usd_rate)
    {success: true}
  end

end
