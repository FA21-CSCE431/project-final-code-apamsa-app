class AddGoogleIdToBlogPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :blog_posts, :google_id, :string
  end
end
