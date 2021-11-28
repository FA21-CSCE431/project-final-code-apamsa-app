# frozen_string_literal: true

class Comment < ApplicationRecord
  belongs_to :blog_post
  belongs_to :user
end
