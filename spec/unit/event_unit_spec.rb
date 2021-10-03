# location: spec/unit/event_unit_spec.rb
require 'rails_helper'

RSpec.describe Event, type: :model do
  subject do
    described_class.new(event_name: 'First Meeting',
    event_date: Date.new(2000, 1, 2),
    description: 'This is the first meeting to introduce everyone',
    event_start_time: '12:20 pm',
    event_end_time: '12:40 pm')
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
  
    it 'is not valid without a description' do
    subject.description = nil
    expect(subject).not_to be_valid
  end
  
    it 'is not valid without a start time' do
    subject.event_start_time = nil
    expect(subject).not_to be_valid
  end
  
    it 'is not valid without an end time' do
    subject.event_end_time = nil
    expect(subject).not_to be_valid
  end
end