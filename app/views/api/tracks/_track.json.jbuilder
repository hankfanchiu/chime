json.extract! track, :id, :title, :track_url, :img_url, :description

json.user do
  json.extract! track.user, :id, :username
end
