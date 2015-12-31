json.set! :users do
  json.array! @users do |user|
    json.partial! "api/users/user", user: user
  end
end

json.set! :tracks do
  json.array! @tracks do |track|
    json.partial! "api/tracks/track", track: track
  end
end
