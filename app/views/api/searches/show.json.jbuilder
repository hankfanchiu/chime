json.set! :users do
  json.array! @user_matches do |user|
    json.username user.username
  end
end

json.set! :tracks do
  json.array! @track_matches do |track|
    json.extract! track, :title, :slug
    json.user track.user.username
  end
end
