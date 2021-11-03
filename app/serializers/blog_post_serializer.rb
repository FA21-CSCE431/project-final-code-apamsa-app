class BlogPostSerializer
  include FastJsonapi::ObjectSerializer
  attributes :canComment, :description, :link, :title, :user_id
end
