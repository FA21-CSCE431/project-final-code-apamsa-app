# frozen_string_literal: true

class EventSerializer
  include FastJsonapi::ObjectSerializer
  attributes :event_name, :event_date, :description, :event_start_time, :event_end_time, :slug, :img_url

  has_many :rsvps
end
