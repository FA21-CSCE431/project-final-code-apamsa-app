# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      protect_from_forgery with: :null_session

      def index
        user = User.all

        render json: UserSerializer.new(user).serialized_json
      end

      def show
        user = User.find_by(google_id: params[:google_id])

        render json: UserSerializer.new(user, options).serialized_json
      end

      def create
        user = User.new(user_params)

        if user.save
          render json: UserSerializer.new(user).serialized_json
        else
          render json: { error: user.errors.messages }, status: 422
        end
      end

      def update
        user = User.find_by(google_id: params[:google_id])

        if user.update(user_params)
          render json: UserSerializer.new(user, options).serialized_json
        else
          render json: { error: event.errors.messages }, status: 422
        end
      end

      def destroy
        user = User.find_by(google_id: params[:google_id])

        if user.destroy
          head :no_content
        else
          render json: { error: event.errors.messages }, status: 422
        end
      end

      private

      def user_params
        params.require(:user).permit(:google_id, :name, :email, :img_url, :is_admin, :prizes_won)
      end

      def options
        @options ||= { include: %i[blog_posts], include: %i[rsvps] }
      end
    end
  end
end
