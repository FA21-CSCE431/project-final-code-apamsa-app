class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user_id, :name, :email, :img_url, :is_admin

  has_many :blog_posts
  has_many :comments
end
