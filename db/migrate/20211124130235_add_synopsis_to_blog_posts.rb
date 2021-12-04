class AddSynopsisToBlogPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :blog_posts, :synopsis, :string
  end
end
