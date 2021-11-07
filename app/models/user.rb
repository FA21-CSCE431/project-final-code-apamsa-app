class User < ApplicationRecord
  has_many :blog_posts, dependent: :destroy
  has_many :comments, dependent: :destroy

  def self.create_from_omniauth(auth)
    where(email: auth.info.email).first_or_initialize do |user|
      user.user_id = auth.info.uid
      user.name = auth.info.full_name
      user.email = auth.info.email
      user.img_url = auth.info.image
    end
  end
end
