class SettingsController < ApplicationController
  before_filter :only_admin
  layout 'angular'

  def update
    success = Setting.first.update(params.require(:setting).permit(:main_page_text, :contacts_text, :recalculatable))
    render json: {success: success}
  end

  def global
  end
  def page_editor
  end

end
