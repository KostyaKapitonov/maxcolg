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
end
