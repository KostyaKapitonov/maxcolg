class UsersController < ApplicationController

  def index

    @users = User.all

  end

  def sign_out
    session.destroy
    redirect_to root_path
  end

end
