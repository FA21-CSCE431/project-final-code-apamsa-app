# frozen_string_literal: true

class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.string :event_name
      t.date :event_date
      t.string :description
      t.string :slug
      t.string :img_url
      t.string :event_start_time
      t.string :event_end_time

      t.timestamps
    end
  end
end
