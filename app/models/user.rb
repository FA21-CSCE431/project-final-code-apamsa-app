class User < ApplicationRecord
  has_many :blog_posts, dependent: :destroy
  has_many :comments, dependent: :destroy

end
