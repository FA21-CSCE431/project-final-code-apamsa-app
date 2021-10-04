# location: spec/unit/rsvp_unit_spec.rb
require 'rails_helper'

RSpec.describe Rsvp, type: :model do
  subject do
    described_class.new(event_name: 'First Meeting',
    event_date: Date.new(2000, 1, 2),
    f_name: 'Testy',
    l_name: 'McTesterson',
    uin: '123004567')
  end

  it 'is valid with valid attributes' do
    expect(subject).to be_valid
  end

  it 'is not valid without a name' do
    subject.event_name = nil
    expect(subject).not_to be_valid
  end
  
    it 'is not valid without a date' do
    subject.event_date = nil
    expect(subject).not_to be_valid
  end
  
    it 'is not valid without a first name' do
    subject.f_name = nil
    expect(subject).not_to be_valid
  end
  
    it 'is not valid without a last name' do
    subject.l_name = nil
    expect(subject).not_to be_valid
  end
  
    it 'is not valid without a UIN' do
    subject.uin = nil
    expect(subject).not_to be_valid
  end
end