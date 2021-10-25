# frozen_string_literal: true

json.extract! user, :id, :f_name, :l_name, :email, :isAdmin, :created_at, :updated_at
json.url user_url(user, format: :json)
