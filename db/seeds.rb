test = User.create!(email: "test@test.com", password: "password")

test.tracks.create!(
  title: "Canon in D",
  track_url: "http://localhost:3000/assets/tracks/canon.mp3",
  description: "Nice free music from Amazon"
)

test.tracks.create!(
  title: "Deck the Halls",
  track_url: "http://localhost:3000/assets/tracks/deck.mp3",
  description: "Christmas music!"
)

test.tracks.create!(
  title: "Hark!",
  track_url: "http://localhost:3000/assets/tracks/hark.mp3",
  description: "Hark hark hark hark hark"
)

test.tracks.create!(
  title: "Jingle Bell",
  track_url: "http://localhost:3000/assets/tracks/jingle.mp3",
  description: "Jingle my bells"
)

test.tracks.create!(
  title: "Santa Baby",
  track_url: "http://localhost:3000/assets/tracks/santa.mp3",
  description: "Christmas is almost here.."
)
