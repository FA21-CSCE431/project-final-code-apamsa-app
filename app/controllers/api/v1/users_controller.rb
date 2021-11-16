class Api::V1::UsersController < ApplicationController

  protect_from_forgery with: :null_session

  def index
    user = User.all
    
    render json: UserSerializer.new(user).serialized_json
  end

  def show
    user = User.find_by(user_id: params[:user_id])

    render json: UserSerializer.new(user).serialized_json
  end

  def create
    user = User.new(user_params)

    if user.save
      render json: UserSerializer.new(user).serialized_json
    else
      render json: { error: user.errors.messages }, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:user_id, :name, :email, :img_url, :is_admin)
  end

end