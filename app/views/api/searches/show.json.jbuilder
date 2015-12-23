json.set! :users do
  json.array! @user_matches do |user|
    json.username     user.username
    json.avatar_hero  user.avatar_hero
  end
end

json.set! :tracks do
  json.array! @track_matches do |track|
    json.title        track.title
    json.slug         track.slug
    json.img_hero     track.img_hero
    json.user         track.user.username
  end
end
