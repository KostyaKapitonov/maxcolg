p 'started...'
Category.destroy_all
%w(Гольфы Колготки Леггинсы Чулки Носки).each do |c|
  Category.create(name: c)
end

Firm.destroy_all
%w(Golden\ Lady Omsa Glamour Sisi Fillodoro Conte Ника).each do |f|
  Firm.create(name: f)
end

@rand = nil
def rnd(from, to = nil)
  @rand = Random.new() if @rand.blank?
  unless to
    @rand.rand(from)
  else
    from + @rand.rand(to-from)
  end
end

product_count = 150
Product.destroy_all
cats = Category.all
firms = Firm.all
name2 = %w(зимние тонкие 20\ ден 40\ ден шерстянные сетчатые капроновые)
descriptions = [
    'Отличная вещь, стоит носить, не пожалеете!',
    'Качество превосходное, носится удобно, кто брал - не жаловался.',
    'Вполне подойдёт, как часть повседневной одежды. Приятный на ощупь материал.',
    'Эклсклюзивная вещь, за относительно небольщие деньги. Окрущающие будут вам завидовать!'
]

images = [
    'http://www.charmante.ru/im/ic/00/00/af/e8_f0734ed8.jpg',
    'http://www.charmante.ru/im/ic/00/00/9d/fc_84e3d636.jpg',
    'http://www.charmante.ru/im/ic/00/00/c1/46_a6ff8016.jpg',
    'http://www.charmante.ru/im/ic/00/00/8e/da_6047c820.jpg',
    'http://www.charmante.ru/im/ic/00/00/90/2e_97c5fc0c.jpg',
    'http://www.charmante.ru/im/ic/00/00/bd/21_853ea3c6.jpg',
    'http://www.charmante.ru/im/ic/00/00/ae/93_14495176.jpg',
    'http://www.charmante.ru/im/ic/00/00/9d/fd_be2246e4.jpg',
    'http://www.charmante.ru/im/ic/00/00/d8/8b_3ad2d41e.jpg',
    'http://www.charmante.ru/im/ic/00/00/ae/94_dedb55a3.jpg',
    'http://www.charmante.ru/im/ic/00/00/bd/24_396a3790.jpg',
    'http://www.charmante.ru/im/ic/00/00/9e/d2_ea075ba5.jpg',
    'http://www.charmante.ru/im/ic/00/00/ae/9c_4c469ca0.jpg',
    'http://www.charmante.ru/im/ic/00/00/bd/27_b935bc2b.jpg',
    'http://www.charmante.ru/im/ic/00/00/b8/03_a0a73c99.jpg',
    'http://www.charmante.ru/im/ic/00/00/ae/a3_2ffd182f.jpg',
    'http://www.charmante.ru/im/ic/00/00/b8/02_6863f247.jpg',
    'http://www.charmante.ru/im/ic/00/00/c1/f7_3a401738.jpg',
    'http://www.charmante.ru/im/ic/00/00/bd/39_d42554d4.jpg',
    'http://www.charmante.ru/im/ic/00/00/bd/40_31d64865.jpg',
    'http://www.charmante.ru/im/ic/00/00/b5/00_3717f4a2.jpg'
]

product_count.times do
  cat = cats.sample
  Product.create(
      name: "#{cat.name} #{name2.sample}",
      category: cat,
      firm: firms.sample,
      description: descriptions.sample,
      price: rnd(30,880),
      image: images.sample
  )
end