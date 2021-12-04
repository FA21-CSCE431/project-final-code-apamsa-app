# frozen_string_literal: true

class User < ApplicationRecord
  has_many :blog_posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :rsvps, dependent: :destroy

  validates :email, uniqueness: true
end
