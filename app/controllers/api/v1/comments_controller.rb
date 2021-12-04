# frozen_string_literal: true

module Api
  module V1
    class CommentsController < ApplicationController
      protect_from_forgery with: :null_session

      def index
        comment = Comment.all

        render json: CommentSerializer.new(comment).serialized_json
      end

      def show
        comment = Comment.find(params[:id])

        render json: CommentSerializer.new(comment).serialized_json
      end

      def create
        comment = Comment.new(comment_params)

        if comment.save
          render json: CommentSerializer.new(comment).serialized_json
        else
          render json: { error: comment.errors.messages }, status: 422
        end
      end

      def update
        comment = Comment.find(params[:id])

        if comment.update(comment_params)
          render json: CommentSerializer.new(comment).serialized_json
        else
          render json: { error: comment.errors.messages }, status: 422
        end
      end

      def destroy
        comment = Comment.find(params[:id])

        if comment.destroy
          head :no_content
        else
          render json: { error: comment.errors.messages }, status: 422
        end
      end

      private

      def comment_params
        params.require(:comment).permit(:description, :created_at, :blog_post_id, :user_id, :updated_at, :google_id)
      end
    end
  end
end
