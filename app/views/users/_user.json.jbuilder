json.extract! user, :id, :user_fname, :user_lname, :is_admin, :email, :created_at, :updated_at
json.url user_url(user, format: :json)
