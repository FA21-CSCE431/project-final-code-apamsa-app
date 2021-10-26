# frozen_string_literal: true

class RsvpSerializer
  include FastJsonapi::ObjectSerializer
  attributes :event_name, :event_date, :f_name, :l_name, :email, :event_id
end
