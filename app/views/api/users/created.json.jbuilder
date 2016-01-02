json.user do
  json.partial! "api/users/user", user: @user
end

json.success ["Account created. Let's get chiming."]
