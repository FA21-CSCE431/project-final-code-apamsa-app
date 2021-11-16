# frozen_string_literal: true

class Rsvp < ApplicationRecord
  belongs_to :event
  
  validates :event_name, presence: true
  validates :event_date, presence: true
  validates :name, presence: true
  validates :email, presence: true
end
