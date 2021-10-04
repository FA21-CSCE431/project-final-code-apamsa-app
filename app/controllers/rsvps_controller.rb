class RsvpsController < ApplicationController
  before_action :get_event
  before_action :set_rsvp, only: %i[ show edit update destroy ]

  # GET /rsvps or /rsvps.json
  def index
    @rsvps = @event.rsvps
  end

  # GET /rsvps/1 or /rsvps/1.json
  def show
  end

  # GET /rsvps/new
  def new
    @rsvp = @event.rsvps.build
	@rsvp.send('event_name=', @event.event_name)
	@rsvp.send('event_date=', @event.event_date)
  end

  # GET /rsvps/1/edit
  def edit
  end

  # POST /rsvps or /rsvps.json
  def create
    @rsvp = @event.rsvps.build(rsvp_params)
	@rsvp.send('event_name=', @event.event_name)
	@rsvp.send('event_date=', @event.event_date)

    respond_to do |format|
      if @rsvp.save
        format.html { redirect_to event_rsvps_path(@event), notice: "Rsvp was successfully created." }
        format.json { render :show, status: :created, location: @rsvp }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @rsvp.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /rsvps/1 or /rsvps/1.json
  def update
    respond_to do |format|
      if @rsvp.update(rsvp_params)
        format.html { redirect_to event_rsvps_path(@event), notice: "Rsvp was successfully updated." }
        format.json { render :show, status: :ok, location: @rsvp }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @rsvp.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /rsvps/1 or /rsvps/1.json
  def destroy
    @rsvp.destroy
    respond_to do |format|
      format.html { redirect_to event_rsvps_path(@event), notice: "Rsvp was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
	def get_event
	  @event = Event.find(params[:event_id])
	end
    # Use callbacks to share common setup or constraints between actions.
    def set_rsvp
      @rsvp = @event.rsvps.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def rsvp_params
      params.require(:rsvp).permit(:event_name, :event_date, :f_name, :l_name, :email, :event_id)
    end
end
