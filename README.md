# README

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|content|string|
|content|string|
|user_id|integer|null: false, forgin_key: true|
|group_id|integer|null: false, forgin_key: true|
### Association
- belongs_to :user
- belongs_to :group

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: ture, index: true|
|email|string|null: false, unique: true|
|password|string|null: false|
- has_many :messages
- has_many :group_users
- has_many :groups, throuth: :group_user


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true, unique: true|
### Association
- has_many :messages
- has_many :group_users
- has-many :users, throuth: :group_user

## group_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, forgin_key: true|
|group_id|integer|null: false, forgin_key: true|
### Association
- belongs_to :user
- belongs_to :group