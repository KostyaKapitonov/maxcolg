require 'fileutils'

desc 'Create nondigest versions of all ckeditor digest assets'
task 'assets:precompile' do
  fingerprint = /\-[0-9a-f]{32}\./
  for file in Dir['vendor/assets/javascript/ck_editor/**/*']
    next unless file =~ fingerprint
    nondigest = file.sub fingerprint, '.'
    FileUtils.cp file, nondigest, verbose: true
  end
end