class RenameImageUrlToImgUrl < ActiveRecord::Migration[6.1]
  def change
    rename_column :users, :image_url, :img_url
  end
end
