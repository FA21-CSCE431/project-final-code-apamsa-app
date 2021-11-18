# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Events', type: :request do
  describe 'GET /index' do
    before do
      get api_v1_events_path
    end

    it 'is successful' do
      expect(response).to have_http_status(:ok)    
    end
  end
end
