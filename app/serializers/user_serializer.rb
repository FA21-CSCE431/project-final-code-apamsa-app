class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user_id, :name, :email, :image_url

  has_many :blog_posts
end
