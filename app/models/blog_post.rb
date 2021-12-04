# frozen_string_literal: true

class BlogPost < ApplicationRecord
  belongs_to :user

  before_create :slugify
  # set slug file
  def slugify
    self.slug = title.parameterize
  end

  has_many :comments, dependent: :destroy
end
