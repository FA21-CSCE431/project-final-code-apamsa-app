#location: spec/feature/rsvp_fname_integration_spec.rb
require 'rails_helper'

RSpec.describe 'Creating an Event', type: :feature do
	scenario 'valid inputs' do
		visit new_rsvp_path
		fill_in 'Event name', with: "First Meeting"
		fill_in 'F name', with: "Joe"
		fill_in 'L name', with: "joeson"
		fill_in 'Uin', with: "123456789"
		select '2021', :from => 'rsvp[event_date(1i)]'
		select 'October', :from => 'rsvp[event_date(2i)]'
		select '1', :from => 'rsvp[event_date(3i)]'
		click_on 'Create Rsvp'
		visit rsvps_path
		click_on 'Show'
		expect(page).to have_content('Joe')
	end
end