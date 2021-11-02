# frozen_string_literal: true

require 'application_system_test_case'

class RsvpsTest < ApplicationSystemTestCase
  setup do
    @rsvp = rsvps(:one)
  end

  test 'visiting the index' do
    visit rsvps_url
    assert_selector 'h1', text: 'Rsvps'
  end

  test 'creating a Rsvp' do
    visit rsvps_url
    click_on 'New Rsvp'

    fill_in 'Event date', with: @rsvp.event_date
    fill_in 'Event name', with: @rsvp.event_name
    fill_in 'F name', with: @rsvp.f_name
    fill_in 'L name', with: @rsvp.l_name
    fill_in 'Uin', with: @rsvp.uin
    click_on 'Create Rsvp'

    assert_text 'Rsvp was successfully created'
    click_on 'Back'
  end

  test 'updating a Rsvp' do
    visit rsvps_url
    click_on 'Edit', match: :first

    fill_in 'Event date', with: @rsvp.event_date
    fill_in 'Event name', with: @rsvp.event_name
    fill_in 'F name', with: @rsvp.f_name
    fill_in 'L name', with: @rsvp.l_name
    fill_in 'Uin', with: @rsvp.uin
    click_on 'Update Rsvp'

    assert_text 'Rsvp was successfully updated'
    click_on 'Back'
  end

  test 'destroying a Rsvp' do
    visit rsvps_url
    page.accept_confirm do
      click_on 'Destroy', match: :first
    end

    assert_text 'Rsvp was successfully destroyed'
  end
end
