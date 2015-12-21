json.extract! @track, :id, :title, :slug, :track_url, :img_url, :description

json.user do
  json.extract! @track.user, :id, :username
end
