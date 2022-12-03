puts "Seeding Users..."
jason = User.create(username: 'jason', password: 'test', password_confirmation: 'test')
user1 = User.create(username: 'user1', password: 'test', password_confirmation: 'test')
user2 = User.create(username: 'user2', password: 'test', password_confirmation: 'test')
user3 = User.create(username: 'user3', password: 'test', password_confirmation: 'test')

puts "Seeding Brands..."
brand1 = Brand.create(name: 'NIKE')
brand2 = Brand.create(name: 'ADIDAS')
brand3 = Brand.create(name: 'APPLE')
brand4 = Brand.create(name: 'SONY')
brand5 = Brand.create(name: 'LEGO')
brand6 = Brand.create(name: 'UNHIDE')

puts "Seeding Categories..."
category1 = Category.create(name: 'SHOES')
category2 = Category.create(name: 'TSHIRT')
category3 = Category.create(name: 'LAPTOP')
category4 = Category.create(name: 'HEADPHONE')
category5 = Category.create(name: 'COLLECTABLE')
category6 = Category.create(name: 'BLANKET')

puts "Seeding Reviews..."
review1 = Review.create({
    'title': "Nike Shoes Review", 
    'brand_id': 1,
    'category_id': 1,
    'price': 100,
    'rating': 4,
    'recommend': 'yes',
    'description': 'A good Nike Shoes',
    'user_id': 1,
    'image_url': 'https://ik.imagekit.io/baikjs87/air-force-1-shadow-womens-shoes-kTgn9J_rUDd3Hk9s.jpg'
})
review2 = Review.create({
    'title': "Adidas T-shirt Review", 
    'brand_id': 2,
    'category_id': 2,
    'price': 40,
    'rating': 2,
    'recommend': 'no',
    'description': 'I wouldn\'t get it',
    'user_id': 2,
    'image_url': 'https://ik.imagekit.io/baikjs87/adidas-tshirt_6D7ERcJor.webp'
})
review3 = Review.create({
    'title': "Apple laptop Review", 
    'brand_id': 3,
    'category_id': 3,
    'price': 2400,
    'rating': 5,
    'recommend': 'yes',
    'description': 'An expensive laptop but its Apple',
    'user_id': 3,
    'image_url': 'https://ik.imagekit.io/baikjs87/macbookpro_o92b_HrO4.jpg'
})
review4 = Review.create({
    'title': "Sony headphone Review", 
    'brand_id': 4,
    'category_id': 4,
    'price': 300,
    'rating': 3,
    'recommend': 'no',
    'description': 'A decent headphone',
    'user_id': 4,
    'image_url': "https://ik.imagekit.io/baikjs87/Sony_XM5_listening_hero_potential_F4B0jY9b0.jpg"
})
review5 = Review.create({
    'title': "Lego Aston Martin DB5", 
    'brand_id': 5,
    'category_id': 5,
    'price': 160,
    'rating': 4,
    'recommend': 'yes',
    'description': 'Very cool and good looking lego piece. Faithful to the real car and cool little gimmicks Good display piece Good for present',
    'user_id': 1,
    'image_url': "https://ik.imagekit.io/baikjs87/test_jf1iokb5p.jpg"
})
review6 = Review.create({
    'title': "Unhide blanket SUPER SOFT", 
    'brand_id': 6,
    'category_id': 6,
    'price': 199,
    'rating': 4,
    'recommend': 'yes',
    'description': 'Super soft. feels like sleeping on clouds. a little shedding but otherwise really impressive and satisfied',
    'user_id': 1,
    'image_url': "https://ik.imagekit.io/baikjs87/unhide-blanket_m4jnIx_y_.jpg"
})

puts "Seeding Comments..."
comment1 = Comment.create({
    'body': 'rtherythertgetrgwrethgsrtbsrtbsdrv',
    'user_id': 1,
    "review_id": 1
})
comment2 = Comment.create({
    'body': 'esrvservsertbvsertbsrtb',
    'user_id': 2,
    "review_id": 1
})
comment3 = Comment.create({
    'body': 'sertvbsertvbsertbvsertb',
    'user_id': 3,
    "review_id": 1
})
comment4 = Comment.create({
    'body': 'sfgbsrtbndryndfghn',
    'user_id': 4,
    "review_id": 2
})
comment5 = Comment.create({
    'body': 'dfgynsrtmjfgjuhmneyn',
    'user_id': 1,
    "review_id": 2
})
comment6 = Comment.create({
    'body': 'srftnbsrtnsdfygnsrtbsrtgbrst',
    'user_id': 2,
    "review_id": 3
})
comment7 = Comment.create({
    'body': 'stgbsdrtbnsrb',
    'user_id': 3,
    "review_id": 3
})
comment8 = Comment.create({
    'body': 'srtbsdftndtumy,m',
    'user_id': 4,
    "review_id": 4
})
comment9 = Comment.create({
    'body': 'o.gi,duyjsr5thasertg',
    'user_id': 1,
    "review_id": 4
})
comment10 = Comment.create({
    'body': '456y36y25g4g',
    'user_id': 1,
    "review_id": 5
})
comment11 = Comment.create({
    'body': '7jhtn78 465hy e57y',
    'user_id': 1,
    "review_id": 6
})
comment12 = Comment.create({
    'body': 'er sekfmnw qecqwijh e33',
    'user_id': 2,
    "review_id": 5
})
comment13 = Comment.create({
    'body': ' c w49f2 qow 2f- frvn',
    'user_id': 3,
    "review_id": 6
})

puts "✅ Done seeding!"