class CartsController < ApplicationController
  before_filter :only_logged_in, only: [:edit, :add_position, :remove_position, :confirm]
  before_filter :only_admin, only: [:index, :proceed, :destroy]

  def index
    respond_to do |format|
      format.html
      format.json {
        carts = admin? ? Cart.all : current_user.carts
        render json: carts
      }
    end
  end

  def view
    respond_to do |format|
      format.html
      format.json {
        if admin?
          params.require(:id)
          cart = Cart.where_id(params[:id])
        else
          cart = Cart.aclual
        end
        render json: cart
      }
    end
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

end
