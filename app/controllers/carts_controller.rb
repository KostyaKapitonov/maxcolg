class CartsController < ApplicationController
  before_filter :only_logged_in, only: [:index, :view, :add_position, :remove_position, :confirm, :zones]
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

  def view
    # respond_to do |format|
    #   format.html
    #   format.json {
    #     if admin?
    #       params.require(:id)
    #       cart = Cart.where_id(params[:id])
    #     else
    #       cart = Cart.actual(current_user.id)
    #     end
    #     render json: cart
    #   }
    # end
  end

  def add_position
    params.require(:product_id)
    res = Cart.add_position(params[:product_id], current_user.id)
    render json: res
  end

  def remove_position
    render json: {}
  end

  def confirm
    render json: {}
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
