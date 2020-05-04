require 'rails_helper'

feature 'message', type: :feature do
# このブロックの内部にscenarioを記述していく
  let(:user) { create(:user) }
  let(:group) { create(:group) }
  # let(:message) { create(:message) }

  scenario 'ユーザー情報が更新されていること' do
    visit root_path
    expect(page).to have_no_button('Send')
    visit new_user_session_path
    fill_in 'user-email', with: user.email
    fill_in 'user-password', with: user.password
    find('input[name="commit"]').click
    expect(current_path).to eq root_path
    visit group_messages_path(group.id)
    expect(page).to have_button('Send')

    expect {
      click_button('Send')
      fill_in 'text', with: "yaaaaaa"
      # fill_in 'message_image', with: message.image
      find('input[type="submit"]').click
    }.to change(Message, :count).by(1)
    expect(current_path).to eq group_messages_path(group.id)

    # expect {
      expect(page).to have_content("Edit")
      click_link("Edit")
      expect(current_path).to eq edit_group_path(group.id)
      fill_in 'group_name', with: 33
      check 'group[user_ids][]'
      click_on '更新する'
      expect(current_path).to eq group_messages_path(group.id)
      expect(page).to have_button('Sen')
    # }.to eq group_messages_path(group.id)
  end
end