# frozen_string_literal: true

class User < ApplicationRecord
  def self.create_from_omniauth(auth)
    where(email: auth.info.email).first_or_initialize do |user|
      user.user_id = auth.info.uid
      user.name = auth.info.full_name
      user.email = auth.info.email
      user.img_url = auth.info.image
    end
  end
end
