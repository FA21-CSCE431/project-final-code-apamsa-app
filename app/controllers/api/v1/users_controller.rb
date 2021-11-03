class Api::V1::UsersController < ApplicationController

  def index
    user = User.all
    
    render json: UserSerializer.new(user).serialized_json

  def show
    user = User.find_by(email: params[:email])

    render json: UserSerializer.new(user).serialized_json
  end

end