class Event < ApplicationRecord
    validates :event_name, presence: true
    validates :event_date, presence: true
    validates :description, presence: true
    validates :event_start_time, presence: true
    validates :event_end_time, presence: true
    validates :created_at, presence: true
    validates :updated_at, presence: true
end
