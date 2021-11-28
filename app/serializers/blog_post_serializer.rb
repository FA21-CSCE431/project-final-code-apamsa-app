# frozen_string_literal: true

class BlogPostSerializer
  include FastJsonapi::ObjectSerializer
  attributes :canComment, :description, :link, :title, :user_id, :slug, :google_id, :synopsis, :created_at

  has_many :comments
end
