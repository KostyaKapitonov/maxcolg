class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :admin?

  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end

  def admin?
    return false unless current_user
    !current_user.blank? && current_user.vk_id == '8198870' || current_user.vk_id == '2965678'
  end

  def only_admin
    raise ActionController::RoutingError.new('Not Found') unless current_user
    raise ActionController::RoutingError.new('Not Found') if !(!current_user.blank? && current_user.vk_id == '8198870' || current_user.vk_id == '2965678')
  end
end
