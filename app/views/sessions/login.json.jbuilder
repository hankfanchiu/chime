json.session_token current_user.session_token

json.extract! @user, :id, :username, :email

json.playlists @user.playlists do |playlist|
  json.partial! "api/playlists/playlist", playlist: playlist
end

json.tracks @user.tracks do |track|
  json.partial! "api/tracks/track", track: track
end
