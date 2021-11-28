class AddPrizeNumToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :prizes_won, :int
  end
end
