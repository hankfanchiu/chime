json.extract! playlist, :id, :title, :description

json.tracks playlist.tracks do |track|
  json.extract! track, :id, :title, :slug, :track_url, :description

  json.user do
    json.extract! track.user, :id, :username
  end
end
