class User < ActiveRecord::Base

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  def self.find_or_create auth_params
    user = User.where(:url => auth_params[:url]).first || User.create!(auth_params)
    user
  end
end
