require 'rails_helper'

RSpec.describe "users/new", type: :view do
  before(:each) do
    assign(:user, User.new(
      f_name: "MyString",
      l_name: "MyString",
      email: "MyString",
      isAdmin: false
    ))
  end

  it "renders new user form" do
    render

    assert_select "form[action=?][method=?]", users_path, "post" do

      assert_select "input[name=?]", "user[f_name]"

      assert_select "input[name=?]", "user[l_name]"

      assert_select "input[name=?]", "user[email]"

      assert_select "input[name=?]", "user[isAdmin]"
    end
  end
end