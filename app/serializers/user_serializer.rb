# frozen_string_literal: true

class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :google_id, :name, :email, :img_url, :is_admin, :prizes_won

  has_many :blog_posts
  has_many :comments
  has_many :rsvps
end
