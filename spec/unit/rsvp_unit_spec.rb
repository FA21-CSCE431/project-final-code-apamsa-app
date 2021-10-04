# location: spec/unit/rsvp_unit_spec.rb
require 'rails_helper'

RSpec.describe Rsvp, type: :model do

  subject do
    @event = Event.new(event_name: 'First Meeting',
                      event_date: Date.new(2000, 1, 2),
                      description: 'This is the first meeting to introduce everyone',
                      event_start_time: '12:20 pm',
                      event_end_time: '12:40 pm')

    described_class.new(f_name: 'Testy',
    l_name: 'McTesterson',
    email: 'tmctesterson@yahoo.com',
    event_id: @event.id)
  end

  # it 'is valid with valid attributes' do
  #   expect(subject).to be_valid
  # end

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
  
    it 'is not valid without a email' do
    subject.email = nil
    expect(subject).not_to be_valid
  end
end