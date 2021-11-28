# frozen_string_literal: true

class ChangeUserIdToGoogleIdInUsers < ActiveRecord::Migration[6.1]
  def change
    rename_column :users, :user_id, :google_id
  end
end
