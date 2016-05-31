class PasswordsController < Devise::PasswordsController
  def new
    super
  end

  def create
    if check_captcha(params[:captcha])
      super
    else
      render json: {success: false, error: 'captcha'}
    end
  end

  def edit
    super
  end

  def update
    super
  end
end