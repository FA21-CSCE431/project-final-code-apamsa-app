# frozen_string_literal: true

module Api
  module V1
    class EventsController < ApplicationController
      # before_action :set_event, only: %i[ show edit update destroy ]

      protect_from_forgery with: :null_session

      def index
        events = Event.all

        render json: EventSerializer.new(events).serialized_json
      end

      def show
        event = Event.find_by(slug: params[:slug])

        render json: EventSerializer.new(event, options).serialized_json
      end

      def create
        event = Event.new(event_params)

        if event.save
          render json: EventSerializer.new(event).serialized_json
        else
          render json: { error: event.errors.messages }, status: 422
        end
      end

      def update
        event = Event.find_by(slug: params[:slug])

        if event.update(event_params)
          render json: EventSerializer.new(event, options).serialized_json
        else
          render json: { error: event.errors.messages }, status: 422
        end
      end

      def destroy
        event = Event.find_by(slug: params[:slug])

        if event.destroy
          head :no_content
        else
          render json: { error: event.errors.messages }, status: 422
        end
      end

      private

      def event_params
        params.require(:event).permit(:event_name, :event_date, :description, :event_start_time, :event_end_time, :img_url)
      end

      def options
        @options ||= { include: %i[rsvps] }
      end
    end
  end
end
