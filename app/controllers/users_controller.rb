class UsersController < ApplicationController
  before_filter :only_logged_in, except: [:u_login, :login, :is_email_free, :create, :confirm_email, :password_reset]

  def u_login
    params.require(:u_token)
    authorized = false
    user_login_info = get_ulogin_data(params[:u_token])
    unless user_login_info['identity'].blank?
      provider = UserProvider.where(url: user_login_info['identity']).first
      if provider.blank?
        unless current_user.blank?
          # TODO: Check this !
          success = UserProvider.create(url: user_login_info['identity'], user_id: current_user.id)
          return render json: {success: success}
        end
      else
        user = provider.user
        unless user.blank?
          authorized = sign_in_and_redirect(:user, user, {confirm_msg: 'welcome'}) unless user.blank?
        end
      end
    end
    render json: {authorized: authorized, data: user_login_info}
  end

  def login
  end

  def is_email_free
    render json: {free: User.where(email: params[:email].to_s.downcase!).first.blank?}
  end

  def create
  end

  def confirm_email
    user = User.find_and_confirm_email(params[:token])
    return redirect_to root_path(confirm_msg: 'invalid_token') if user.blank?
    sign_in_and_redirect(:user, user, {confirm_msg: 'thx'})
  end

  def password_reset
    if request.get?
      respond_to do |f|
        f.html
        f.json {
          user = User.find_to_reset_email(params[:token])
          render json: user.blank? ? {success: false} : {email: user.email}
        }
      end
    elsif request.post?
      user = User.find_to_reset_email(params[:token])
      not_found if user.blank?
      result = user.update_password(user, params.permit(:password, :password_confirmation))
      render json: result
    end
  end

  def account
    params.require(:user).require(:id)
    user = User.where(id: params[:user][:id])
    not_found if user.blank? || user.id != current_user.id
    render json: {success: user.update_attributes(params.require(:user).permit(:first_name, :last_name, :father_name, :address))}
  end

  def add_provider
    params.require(:u_token)
    UserProvider.create(get_ulogin_data(params[:u_token]))
  end

  private

  def get_ulogin_data(token)
    url = URI.parse("http://ulogin.ru/token.php?token=#{params[:u_token]}")
    req = Net::HTTP::Get.new(url.to_s)
    res = Net::HTTP.start(url.host, url.port) {|http| http.request(req)}
    JSON.parse res.body
    # TODO: prepare to save
  end

end
