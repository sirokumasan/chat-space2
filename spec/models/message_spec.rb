require 'rails_helper'

describe Message do
  describe '#create' do
    context 'messageを保存できる場合' do
      it "文字のみの投稿" do
        message = build(:message, image: nil)
        expect(message).to be_valid
      end
  
      it "画像のみの投稿" do
        message = build(:message, content: nil)
        expect(message).to be_valid
      end
  
      it "文字と画像の投稿" do
        expect(build(:message)).to be_valid
      end  
    end

    context 'messageを保存できない場合' do
      it "文字と画像両方ない時" do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include("を入力してください")
      end
  
      it "group_idがない時" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end
  
      it "user_idがない時" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
  
    end 
  end
end