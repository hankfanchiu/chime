json.user do
  json.partial! "api/users/user", user: @user
end

json.success ["Your account has been updated."]
