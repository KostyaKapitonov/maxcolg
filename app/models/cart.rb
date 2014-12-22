class Cart < ActiveRecord::Base
  belongs_to :user
  belongs_to :zone
  belongs_to :status
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
    prod = Product.where(id:product_id).first
    return {success: false, reason: 'invalid product', hide: (prod.blank? || prod.hidden)} if prod.blank? || prod.hidden || !prod.exist
    return {success: false, reason: 'already'} unless positions.blank?
    cart.positions << Position.new(product_id: product_id)
    {success: true, position: Position.where(product_id: product_id).first, cart: cart}
  end

  def self.validate_and_create(params, current_user)
    is_invalid = params[:cart][:zone_id].blank?
    prod_ids = []
    pos_ids = []
    cart_ids = []
    self_delivery = params[:cart][:self_delivery]
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
    is_invalid = pos_ids.size == 0
    not_found if is_invalid
    cart_id = positions[0].cart_id || params[:cart][:positions][0].cart_id
    positions.each do |pos|
      is_invalid = pos.cart_id != cart_id unless is_invalid
    end
    not_found if is_invalid
    cart = Cart.where(id: cart_ids).all
    is_invalid = cart.size != 1
    not_found if is_invalid
    cart = cart[0]
    is_invalid = cart.id != Cart.actual(current_user.id).id
    not_found if is_invalid
    zone = nil
    unless self_delivery
      zone = Zone.where(id: params[:cart][:zone_id]).first
      is_invalid = zone.blank?
    end
    not_found if is_invalid
    products = Product.where(id: prod_ids).all
    prod_ids_old = []
    if products.size != prod_ids.size
      prod_ids.each do |p_id|
        prod_exist = false
        products.each do|prod|
          prod_exist = prod.id == p_id unless prod_exist
          break if prod_exist
        end
        prod_ids_old << p_id unless prod_exist
      end
    end
    products.each do |prod|
      if prod.hidden || !prod.exist
        prod_ids_old << prod.id unless prod_ids_old.include? prod.id
      end
    end
    unless prod_ids_old.blank?
      Position.where(product_id: prod_ids_old).destroy_all
      return {success: false, ids: prod_ids_old}
    end
    params[:cart][:positions].each do |pos|
        positions.update(pos[:id], count: pos[:count])
    end
    positions.reload
    sum = 0
    positions.each do |pos|
      sum += pos.sum
    end
    params[:cart][:address] = nil if self_delivery
    delivery_price = self_delivery || (zone.free_if_sum && zone.free_if_sum < sum) ? 0 : zone.price
    sum += delivery_price
    cart.update(confirmation_date: DateTime.now, total_price: sum, zone_id: self_delivery ? nil : zone.id,
                confirmed: true, delivery_price: delivery_price, usd_rate: Setting.first.usd_rate,
                address: params[:cart][:address], self_delivery: self_delivery)
    {success: true, cart_id: cart.id}
  end

end
