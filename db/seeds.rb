# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Category.destroy_all
%w(Гольфы Колготки Леггинсы Чулки Носки).each do |c|
  Category.create(name: c)
end

Firm.destroy_all
%w(Andra\ Shape Enrico\ Coveri Marlin Rossoporpora).each do |f|
  Firm.create(name: f)
end

