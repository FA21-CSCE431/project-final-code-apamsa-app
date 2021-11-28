# frozen_string_literal: true

module Api
  module V1
    class RsvpsController < ApplicationController
      # before_action :set_rsvp, only: %i[ show edit update destroy ]

      protect_from_forgery with: :null_session

      def index
        rsvps = Rsvp.all

        render json: RsvpSerializer.new(rsvps).serialized_json
      end

      def create
        rsvp = Rsvp.new(rsvp_params)

        if rsvp.save
          render json: RsvpSerializer.new(rsvp).serialized_json
        else
          render json: { error: rsvp.errors.messages }, status: 422
        end
      end

      def update
        rsvp = Rsvp.find(params[:id])

        if rsvp.update(rsvp_params)
          render json: RsvpSerializer.new(rsvp).serialized_json
        else
          render json: { error: rsvp.errors.messages }, status: 422
        end
      end

      def destroy
        rsvp = Rsvp.find(params[:id])

        if rsvp.destroy
          head :no_content
        else
          render json: { error: rsvp.errors.messages }, status: 422
        end
      end

      private

      def rsvp_params
        params.require(:rsvp).permit(:event_name, :event_date, :name, :email, :event_id, :user_id)
      end
    end
  end
end
