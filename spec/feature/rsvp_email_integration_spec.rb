# frozen_string_literal: true

# location: spec/feature/rsvp_event_date_integration_spec.rb
require 'rails_helper'

RSpec.describe 'Creating an Event', type: :feature do
  scenario 'valid inputs' do
    # Create parent event to test RSVPs
    visit new_event_path
    fill_in 'Event name', with: 'First Meeting'
    fill_in 'Description', with: 'This is the first meeting to introduce everyone'
    fill_in 'Event start time', with: '12:20 pm'
    fill_in 'Event end time', with: '12:40 pm'
    fill_in 'Event date', with: '2000-01-02'
    click_on 'Create Event'
    visit events_path

    # RSVP to test
    click_on 'RSVP'
    fill_in 'First Name', with: 'Joe'
    fill_in 'Last Name', with: 'joeson'
    fill_in 'Email', with: 'test@gmail.com'
    click_on 'Create Rsvp'

    # Testing email from RSVP
    expect(page).to have_content('test@gmail.com')
  end
end
