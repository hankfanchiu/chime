json.extract! @user, :id, :username

if @user = current_user
  json.email @user.email
end

json.playlists @user.playlists do |playlist|
  json.partial! "api/playlists/playlist", playlist: playlist
end

json.tracks @user.tracks do |track|
  json.extract! track, :id, :title, :track_url, :img_url, :description
end
