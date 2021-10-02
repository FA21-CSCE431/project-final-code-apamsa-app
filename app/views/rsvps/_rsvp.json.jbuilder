json.extract! rsvp, :id, :event_name, :event_date, :f_name, :l_name, :uin, :created_at, :updated_at
json.url rsvp_url(rsvp, format: :json)
