json.set! :users do
  json.array! @users do |user|
    json.extract! user, :username, :avatar_hero
  end
end

json.set! :tracks do
  json.array! @tracks do |track|
    json.extract! track, :title, :slug, :img_hero
    json.username track.user.username
  end
end
