class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  helper_method :admin?
  protect_from_forgery with: :exception
  layout 'angular'
  respond_to :json, :html

  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end

  def only_logged_in
    raise ActionController::RoutingError.new('Not Found') unless current_user
  end

  def admin?
    return false unless current_user
    !current_user.blank? && current_user.vk_id == '8198870' || current_user.vk_id == '498144'
  end

  def only_admin
    raise ActionController::RoutingError.new('Not Found') unless current_user
    raise ActionController::RoutingError.new('Not Found') if !(!current_user.blank? && current_user.vk_id == '8198870' || current_user.vk_id == '498144')
  end
end
