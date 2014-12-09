class CartsController < ApplicationController
  before_filter :only_logged_in, only: [:index, :view, :edit, :add_position, :remove_position, :confirm, :zones]
  before_filter :only_admin, only: [:proceed, :destroy, :add_zone]

  def index
    respond_to do |format|
      format.html
      format.json {
        carts = admin? ? Cart.all : current_user.carts
        render json: carts.to_json(include: :positions)
      }
    end
  end

  def statuses
    render json: Status.all
  end

  def view
  end

  def edit
  end

  def add_position
    params.require(:product_id)
    res = Cart.add_position(params[:product_id], current_user.id)
    render json: res
  end

  def remove_position
    pos = Position.where(id: params[:id]).first
    success = false
    success = pos.destroy unless pos.blank? || pos.cart.confirmed || (pos.cart.user.id != current_user.id && !current_user.is_admin)
    render json: {success: success}
  end

  def confirm
    params.require(:cart).require(:positions)
    render json: Cart.validate_and_create(params, current_user)
  end

  def proceed
    render json: {}
  end

  def destroy
    render json: {}
  end

  def zones
    render json: Zone.all
  end

  def add_zone
    res = Zone.create_or_update(params)
    render json: {success: res}
  end

  def del_zone
    render json: {success:  !Zone.where(id:params[:id]).destroy_all.blank?}
  end

end
