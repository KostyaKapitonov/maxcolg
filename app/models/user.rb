class User < ActiveRecord::Base

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  def self.find_or_create auth_params
    user = User.where(provider: auth_params[:provider], vk_id: auth_params[:vk_id]).first || User.create!(auth_params)
    user
  end
end
