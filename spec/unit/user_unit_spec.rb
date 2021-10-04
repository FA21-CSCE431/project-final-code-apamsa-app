# location: spec/unit/user_unit_spec.rb
require 'rails_helper'

RSpec.describe User, type: :model do
  subject do
    described_class.new(user_fname: 'Testy',
    user_lname: 'McTesterson',
    is_admin: true,
    email: 'TestyMcT@tamu.edu')
  end

  it 'is valid with valid attributes' do
    expect(subject).to be_valid
  end

  it 'is not valid without a first name' do
    subject.user_fname = nil
    expect(subject).not_to be_valid
  end
  
    it 'is not valid without a last name' do
    subject.user_lname = nil
    expect(subject).not_to be_valid
  end
  
    it 'is not valid without an user/admin status' do
    subject.is_admin = nil
    expect(subject).not_to be_valid
  end
  
    it 'is not valid without an email' do
    subject.email = nil
    expect(subject).not_to be_valid
  end
end