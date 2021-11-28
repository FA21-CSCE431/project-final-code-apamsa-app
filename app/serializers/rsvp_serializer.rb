# frozen_string_literal: true

class RsvpSerializer
  include FastJsonapi::ObjectSerializer
  attributes :event_name, :event_date, :name, :email, :event_id, :user_id
end
