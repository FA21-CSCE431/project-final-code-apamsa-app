# frozen_string_literal: true

# location: spec/feature/event_date_integration_spec.rb
require 'rails_helper'

describe "Create an event", :type => :request do
  before do
    post '/api/v1/events'
  end
  it 'returns a created status' do
    expect(response).to have_http_status(201)
  end
end
