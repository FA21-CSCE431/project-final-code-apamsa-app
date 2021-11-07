class BlogPostSerializer
  include FastJsonapi::ObjectSerializer
  attributes :canComment, :description, :link, :title, :user_id

  has_many :comments
end
