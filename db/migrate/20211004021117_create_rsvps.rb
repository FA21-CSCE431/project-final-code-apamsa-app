# frozen_string_literal: true

class CreateRsvps < ActiveRecord::Migration[6.1]
  def change
    create_table :rsvps do |t|
      t.string :event_name
      t.date :event_date
      t.string :f_name
      t.string :l_name
      t.string :email
      t.references :event, null: false, foreign_key: true

      t.timestamps
    end
  end
end
