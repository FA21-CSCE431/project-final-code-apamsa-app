# frozen_string_literal: true

class CreateBlogPosts < ActiveRecord::Migration[6.1]
  def change
    create_table :blog_posts do |t|
      t.boolean :canComment
      t.text :description
      t.string :link
      t.string :title
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
