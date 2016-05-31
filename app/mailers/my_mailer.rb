class MyMailer < ActionMailer::Base
  include ApplicationHelper
  helper :application

  def confirmation_instructions(record, token, opts={})
    new_mail = GmailSender.new(ENV['EMAIL_ADDRESS'], ENV['EMAIL_PASSWORD'])
    new_mail.send(:to => record.email, :subject => "Подтверждение почты",
                  :content => confirm_url(record.confirmation_token), content_type: 'text/html; charset="utf-8"')
  end

  def reset_password_instructions(record, token, opts={})
    new_mail = GmailSender.new(ENV['EMAIL_ADDRESS'], ENV['EMAIL_PASSWORD'])
    new_mail.send(:to => record.email, :subject => "Восстановление пароля",
                  :content => reset_url(record.reset_password_token), content_type: 'text/html; charset="utf-8"')
  end

  def unlock_instructions(record, token, opts={})
  end
end
