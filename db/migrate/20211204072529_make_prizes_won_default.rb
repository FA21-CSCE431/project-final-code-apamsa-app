class MakePrizesWonDefault < ActiveRecord::Migration[6.1]
  def change
    change_column :users, :prizes_won, :int, :default => 0
  end
end
