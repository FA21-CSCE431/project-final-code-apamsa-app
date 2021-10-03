class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :user_fname
      t.string :user_lname
      t.boolean :is_admin
      t.string :email

      t.timestamps
    end
  end
end
