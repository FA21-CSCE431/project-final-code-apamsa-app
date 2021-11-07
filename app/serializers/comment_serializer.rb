class CommentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :blog_post_id, :created_at, :description, :user_id, :updated_at
end
