#location: spec/feature/event_name_integration_spec.rb
require 'rails_helper'

RSpec.describe 'Creating an Event', type: :feature do
	scenario 'valid inputs' do
		visit new_event_path
		fill_in 'Event name', with: "First Meeting"
		fill_in 'Description', with: "This is the first meeting to introduce everyone"
		fill_in 'Event start time', with: "12:20 pm"
		fill_in 'Event end time', with: "12:40 pm"
		fill_in 'Event date', with: "2000-01-02"
		click_on 'Create Event'
		visit events_path
		expect(page).to have_content('First Meeting')
	end
end