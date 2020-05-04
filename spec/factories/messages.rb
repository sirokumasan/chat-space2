FactoryBot.define do
  
  factory :message do
    content {Faker::Lorem.sentence}
    image { File.open("#{Rails.root}/public/images/mori.jpg") }
    user
    group
  end
end

