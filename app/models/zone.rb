class Zone < ActiveRecord::Base

  def self.create_or_update(params)
    new_zones =[]
    success = false
    Zone.transaction do
      (params[:new_zones]||[]).each do |nz|
        new_zones << Zone.new(nz.permit(:name,:color,:price))
      end
      (params[:existed_zones]||[]).each do |ez|
        Zone.update(ez[:id],ez.permit(:name,:color,:price))
      end
      new_zones.each(&:save!)
      success = true
    end
    success
  end

end
