class Zone < ActiveRecord::Base
  has_many :carts

  def self.create_or_update(params)
    new_zones =[]
    success = false
    Zone.transaction do
      (params[:new_zones]||[]).each do |nz|
        new_zones << Zone.new(nz.permit(:name,:color,:price, :free_if_sum))
      end
      (params[:existed_zones]||[]).each do |ez|
        Zone.update(ez[:id],ez.permit(:name,:color,:price, :free_if_sum))
      end
      new_zones.each(&:save!)
      success = true
    end
    success
  end

end
