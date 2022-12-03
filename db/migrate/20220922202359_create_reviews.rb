class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.string :title
      t.text :description
      t.float :price
      t.integer :rating
      t.string :recommend
      t.integer :user_id
      t.integer :category_id
      t.integer :brand_id
      t.string :image_url

      t.timestamps
    end
  end
end
