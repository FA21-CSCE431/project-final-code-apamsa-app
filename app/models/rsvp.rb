class Rsvp < ApplicationRecord
    validates :event_name, presence: true
    validates :event_date, presence: true
    validates :f_name, presence: true
    validates :l_name, presence: true
    validates :uin, presence: true
end
