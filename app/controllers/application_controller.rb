class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  helper_method :admin?
  protect_from_forgery with: :exception
  respond_to :json, :html
  layout 'angular'

  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end

  def only_logged_in
    raise ActionController::RoutingError.new('Not Found') if current_user.blank?
  end

  def admin?
    !current_user.blank? && current_user.is_admin
  end

  def only_admin
    raise ActionController::RoutingError.new('Not Found') if current_user.blank? || !current_user.is_admin
  end
end
