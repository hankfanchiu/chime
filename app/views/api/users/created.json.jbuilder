json.user do
  json.partial! "api/users/user", user: @user
end

json.success ["Welcome new user! Let's get chiming."]
