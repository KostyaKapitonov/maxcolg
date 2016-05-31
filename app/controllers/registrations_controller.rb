class RegistrationsController < Devise::RegistrationsController
  def new
    super
  end

  def create
    if check_captcha(params[:user][:captcha])
      super
    else
      render json: {success: false, error: 'captcha'}
    end
  end

  def update
    super
  end
end