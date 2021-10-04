class User < ApplicationRecord
    validates :user_fname, presence: true
    validates :user_lname, presence: true
    validates :is_admin, presence: true
    validates :email, presence: true
end
