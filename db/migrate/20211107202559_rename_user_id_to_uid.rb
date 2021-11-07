class RenameUserIdToUid < ActiveRecord::Migration[6.1]
  def change
    rename_column :users, :user_id, :uid
  end
end
