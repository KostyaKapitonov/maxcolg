module ApplicationHelper

  def table_row(name, input, controls = nil)
    ng_buttons = ''
    if !controls.blank? && controls.class == Array
      controls.each do |c|
        ng_buttons += "<button  class='button input_buttons' x-ng-click='#{c[:action]}'>#{c[:title]}</button>"
      end
    end
    "<td class='row_label'>#{name}</td><td class='td_sep'></td><td class='input'>#{input}#{ng_buttons}</td>".html_safe
  end

  def get_type_options
    all_options = []
    Category.all.each do |to|
      all_options << [to.name, to.id]
    end
    all_options
  end

  def ng_href(name, path, &args)
    "<a ng-href='#{path}'>#{name}</a>".html_safe
  end

  def ulogin_back_url
    ENV['RAILS_ENV'] == 'development' ? 'antalex.herokuapp.com:3000' : 'antalex.herokuapp.com'
  end

  def confirm_url(token)
    "Для завершения регистрации перейдите, пожалуйста, по этой ссылке: antalex.herokuapp.com#{ENV['LOCALHOST_PORT']}/users/confirm_email?token=#{token}".html_safe
  end

  def reset_url(token)
    "Для смены пароля перейдите, пожалуйста, по этой ссылке: antalex.herokuapp.com#{ENV['LOCALHOST_PORT']}/users/password_reset?token=#{token}".html_safe
  end
end
