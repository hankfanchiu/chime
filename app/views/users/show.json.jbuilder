json.extract! @user, :username, :email

json.playlists @playlists do |playlist|
  json.partial! "api/playlists/playlist", playlist: playlist
end
