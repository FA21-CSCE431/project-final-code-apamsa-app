require 'rails_helper'

RSpec.describe "users/show", type: :view do
  before(:each) do
    @user = assign(:user, User.create!(
      f_name: "F Name",
      l_name: "L Name",
      email: "Email",
      isAdmin: false
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/F Name/)
    expect(rendered).to match(/L Name/)
    expect(rendered).to match(/Email/)
    expect(rendered).to match(/false/)
  end
end
