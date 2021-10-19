class Api::V1::EventsController < ApplicationController
  before_action :set_event, only: %i[ show edit update destroy ]

  # GET /events or /events.json
  def index
    @events = Event.all
    render json: @events
  end

  # GET /events/1 or /events/1.json
  def show
    if @event
      render json: @event
    else
      render json: @event.errors
  end

  # GET /events/new
  def new
    @event = Event.new
  end

  # GET /events/1/edit
  def edit
  end

  # POST /events or /events.json
  def create
    @event = Event.new(event_params)

    if @event.save
      render json: @event
    else
      render json: @event.errors
    end
  end

  # PATCH/PUT /beers/1
  # PATCH/PUT /beers/1.json
  def update
  end

  # DELETE /beers/1
  # DELETE /beers/1.json
  def destroy
    @event.destroy

    render json: { notice: 'Event was successfully removed.' }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def event_params
      params.require(:event).permit(:event_name, :event_date, :description, :event_start_time, :event_end_time)
    end
end
