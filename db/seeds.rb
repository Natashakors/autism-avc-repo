# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

image_array = [
  'https://images.unsplash.com/photo-1588072432836-e10032774350?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c2Nob29sfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFya3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvcHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1581622558667-3419a8dc5f83?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8ZGlzaGVzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8c29jY2VyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60'
]
puts 'Cleaning up db...'
Item.destroy_all
puts 'All items deleted'
User.destroy_all
puts 'All users deleted.'
Review.detroy_all
puts 'All reviews deleted'


puts 'Creating users...'
user_email_list = ['s_pinchen@hotmail.com', 'ivanwilf@hotmail.com', 'natasha030320@gmail.com', 'hhknight@me.com']
user_list = []

user_email_list.length.times do |index|
  user = User.create!(email: user_email_list[index], password: "password", name: Faker::Name.name, birthday: Date.new(rand(2011..2015), rand(1..12), rand(1..28)), username: user_email_list[index].match(/(\S+)(@)(\S+)/)[1])
  user_list << user
  puts "User #{user.id}: #{user.email} was created!"
  image_array.each do |image|
    item = Item.new(title: "Task name", start_date: DateTime.new(2021, 3, rand(1..7)), end_date: DateTime.new(2021, 3, rand(1..7)), category: "task,", details: Faker::Movies::StarWars.quote)
    item.user = user
    file = URI.open(image)
    item.photo.attach(io: file, filename: 'first.png', content_type: 'image/png')
    item.save!
    puts "Task for #{user.name} created"
  end
end
