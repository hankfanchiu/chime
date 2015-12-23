json.extract! @user, :id, :username, :email
json.avatar_url @user.avatar.url

json.playlists @user.playlists do |playlist|
  json.partial! "api/playlists/playlist", playlist: playlist
end

json.tracks @user.tracks do |track|
  json.extract! track, :id, :title, :slug, :track_url, :description
end
