json.extract! track,
  :id,
  :title,
  :slug,
  :track_url,
  :description,
  :time_ago,
  :img_hero,
  :img_thumb,
  :img_square

json.user do
  json.extract! track.user, :id, :username, :avatar_square
end
