# frozen_string_literal: true

class AddSlugToBlogPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :blog_posts, :slug, :string
  end
end
