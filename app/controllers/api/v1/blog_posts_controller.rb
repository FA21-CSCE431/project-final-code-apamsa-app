class Api::V1::BlogPostsController < ApplicationController
  # before_action :set_bp, only: %i[ show edit update destroy ]

  protect_from_forgery with: :null_session

  def index
    bp = BlogPost.all

    render json: BlogPostSerializer.new(bp).serialized_json
  end

  def show
    bp = BlogPost.find(params[:id])

    render json: BlogPostSerializer.new(bp).serialized_json
  end

  def create
    bp = BlogPost.new(blog_post_params)

    if bp.save
      render json: BlogPostSerializer.new(bp).serialized_json
    else
      render json: { error: bp.errors.messages }, status: 422
    end
  end

  def update
    bp = BlogPost.find(params[:id])

    if bp.update(blog_post_params)
      render json: BlogPostSerializer.new(bp).serialized_json
    else
      render json: { error: bp.errors.messages }, status: 422
    end
  end

  def destroy
    bp = BlogPost.find(params[:id])

    if bp.destroy
      head :no_content
    else
      render json: { error: bp.errors.messages }, status: 422
    end
  end

  private

  def blog_post_params
    params.require(:blog_post).permit(:canComment, :description, :link, :title, :user_id)
  end

end