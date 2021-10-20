class Event < ApplicationRecord
	has_many :rsvps, dependent: :destroy
  
  before_create :slugify
  # set slug file
  def slugify
    self.slug = event_name.parameterize
  end

  validates :event_name, presence: true
  validates :event_date, presence: true
  validates :description, presence: true
  validates :event_start_time, presence: true
  validates :event_end_time, presence: true
end
