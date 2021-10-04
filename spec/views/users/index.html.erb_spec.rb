require 'rails_helper'

RSpec.describe "users/index", type: :view do
  before(:each) do
    assign(:users, [
      User.create!(
        f_name: "F Name",
        l_name: "L Name",
        email: "Email",
        isAdmin: false
      ),
      User.create!(
        f_name: "F Name",
        l_name: "L Name",
        email: "Email",
        isAdmin: false
      )
    ])
  end

  it "renders a list of users" do
    render
    assert_select "tr>td", text: "F Name".to_s, count: 2
    assert_select "tr>td", text: "L Name".to_s, count: 2
    assert_select "tr>td", text: "Email".to_s, count: 2
    assert_select "tr>td", text: false.to_s, count: 2
  end
end
