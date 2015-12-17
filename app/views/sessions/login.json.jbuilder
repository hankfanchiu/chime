json.session_token current_user.session_token

json.user do
  json.extract! current_user, :id, :username, :email
end
