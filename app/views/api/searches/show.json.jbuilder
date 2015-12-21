json.set! :users do
  json.array! @user_matches do |user|
    json.extract! user, :username
    json.type "user"
    json.sortable user.username
  end
end

json.set! :tracks do
  json.array! @track_matches do |track|
    json.extract! track, :title, :slug, :img_url
    json.user track.user.username
    json.type "track"
    json.sortable track.title
  end
end
