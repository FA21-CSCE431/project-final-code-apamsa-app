# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

event = Event.create([
  {
    event_name: 'Sample Event',
    event_date: '10-08-2021',
    description: 'Social event',
    event_start_time: '12:40 pm',
    event_end_time: '1:40 pm'
  },
  {
    event_name: 'Sample Event 2',
    event_date: '12-12-2021',
    description: 'Corporate event',
    event_start_time: '1:30 pm',
    event_end_time: '2:00 pm'
  },
])

rsvp = Rsvp.create([
  {
    event_name: 'Sample Event',
    event_date: '10-08-2021',
    f_name: 'James',
    l_name: 'Streets',
    email: 'abc@gamil.com',
    event: event.first
  }
])