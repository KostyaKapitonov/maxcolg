class UsersController < ApplicationController

  def u_login
    params.require(:u_token)
    authorized = false
    url = URI.parse("http://ulogin.ru/token.php?token=#{params[:u_token]}")
    req = Net::HTTP::Get.new(url.to_s)
    res = Net::HTTP.start(url.host, url.port) {|http| http.request(req)}
    user_login_info = JSON.parse res.body
    unless user_login_info['identity'].blank?
      provider = UserProvider.where(url: user_login_info['identity']).first
      unless provider.blank?
        user = provider.user
        unless user.blank?
          authorized = sign_in user unless user.blank?
        end
      end
    end
    render json: {authorized: authorized, data: user_login_info}
  end

  def login
  end

  def is_email_free
    render json: {free: User.where(email: params[:email]).first.blank?}
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

  def email_to_reset_pass
    # if request.post?
    #   user = User.find_to_reset_email(params[:token])
    #   not_found if user.blank?
    #   result = user.update_password(user, params.permit(:password, :password_confirmation))
    #   render json: result
    # end
  end

end
