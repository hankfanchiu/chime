json.user do
  json.id             user.id
  json.username       user.username
  json.email          is_current_user?(user) ? user.email : nil # protect PII!
  json.description    user.description
  json.avatar_hero    user.avatar_hero
  json.avatar_thumb   user.avatar_thumb
  json.avatar_square  user.avatar_square
end
