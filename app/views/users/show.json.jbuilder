json.extract! @user, :id, :username

if @user = current_user
  json.email @user.email
end

json.playlists @user.playlists do |playlist|
  json.extract! playlist, :id, :title, :description

  json.tracks playlist.tracks do |track|
    json.extract! track, :id, :title, :track_url, :img_url, :description

    json.user do
      json.extract! track.user, :id, :username
    end
  end

end

json.tracks @user.tracks do |track|
  json.extract! track, :id, :title, :track_url, :img_url, :description
end
