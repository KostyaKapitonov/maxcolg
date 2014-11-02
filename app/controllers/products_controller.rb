class ProductsController < ApplicationController
  before_filter :only_admin, except: [:main, :main_content, :index, :show]
  layout 'angular'

  def main
    render 'main', layout: 'application'
  end

  def main_content
    respond_to do |format|
      format.html
      format.json {
        @setting = Setting.first
        render json: @setting
      }
    end
  end

  def index
    respond_to do |format|
      format.html
      format.json {
        render json: {products: Product.all, categories: Category.all, firms: Firm.all, images: Image.all}
      }
    end
  end

  def get_category_and_firm_options
    render json: {categories: Category.all, firms: Firm.all}
  end

  def create_category_or_firm_option
    success = false
    category = nil
    firm = nil
    if params[:category]
      category = Category.new(params.require(:category).permit(:name))
      success = category.save
    elsif params[:firm]
      firm = Firm.new(params.require(:firm).permit(:name))
      success = firm.save
    end
    render json: {success: success, firm: firm, category: category, categories: Category.all, firms: Firm.all}
  end

  def delete_category_or_firm_option
    success = false
    if params[:category]
      success = Category.where(id: params[:category]).first.destroy;
    elsif params[:firm]
      success = Firm.where(id: params[:firm]).first.destroy;
    end
    render json: {success: success, categories: Category.all, firms: Firm.all}
  end

  def new
  end

  def show
    respond_to do |format|
      format.html
      format.json {
        render json: Product.where(id: params[:id]).first
      }
    end
  end

  def create
    params.require(:product).require(:name)
    @product = Product.new(params.require(:product).permit(:name, :category_id, :firm_id, :price, :description))
    render json: {success: @product.valid? && @product.save, id: @product.id}
  end

  def edit
    respond_to do |format|
      format.html
      format.json {
        render json: Product.where(id: params[:id]).first
      }
    end
  end

  def update
    params.require(:product).require(:name)
    render json: {success: Product.update_if_exist(params[:id],
      params.require(:product).permit(:name, :category_id, :firm_id, :price, :description))}
  end

  def destroy
    render json: {success: Product.where(id: params[:id]).first.try(:destroy)}
  end
end
