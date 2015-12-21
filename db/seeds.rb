demo_user = User.create!(
  username: "demo_user",
  email: "demo_user@chime.audio",
  password: "password"
)

saviours = User.create!(
  username: "SavioursOfTheSpace",
  email: "spaceinvader@chime.audio",
  password: "password"
)

track1 = saviours.tracks.create!(
  title: "Ain't No Mountain High Enough",
  track_url: "/assets/tracks/aintnomountain.mp3",
  description: "No mountain no mountain highhhhh enough"
)

track2 = saviours.tracks.create!(
  title: "Come and Get Your Love",
  track_url: "/assets/tracks/comeandgetyourlove.mp3",
  description: "Christmas is almost here.."
)

track3 = saviours.tracks.create!(
  title: "Day Dream",
  track_url: "/assets/tracks/daydream.mp3",
  description: "Christmas is almost here.."
)

track4 = saviours.tracks.create!(
  title: "Escape",
  track_url: "/assets/tracks/escape.mp3",
  description: "Christmas is almost here.."
)

track5 = saviours.tracks.create!(
  title: "Fooled Around and Fell In Love",
  track_url: "/assets/tracks/fooledaround.mp3",
  description: "Christmas is almost here.."
)

track6 = saviours.tracks.create!(
  title: "Go All The Way",
  track_url: "/assets/tracks/goalltheway.mp3",
  description: "Christmas is almost here.."
)

track7 = saviours.tracks.create!(
  title: "Heads Will Roll",
  track_url: "/assets/tracks/headswillroll.mp3",
  description: "Christmas is almost here.."
)

track8 = saviours.tracks.create!(
  title: "Hooked On A Feeling",
  track_url: "/assets/tracks/hookedonafeeling.mp3",
  description: "Christmas is almost here.."
)

track9 = saviours.tracks.create!(
  title: "I Just Had Sex",
  track_url: "/assets/tracks/ijusthadsex.mp3",
  description: "Christmas is almost here.."
)

track10 = saviours.tracks.create!(
  title: "I Want You Back",
  track_url: "/assets/tracks/iwantyouback.mp3",
  description: "Christmas is almost here.."
)

track11 = saviours.tracks.create!(
  title: "Not In Love",
  track_url: "/assets/tracks/notinlove.mp3",
  description: "Christmas is almost here.."
)

track12 = saviours.tracks.create!(
  title: "O-O-O-H Child",
  track_url: "/assets/tracks/oohchild.mp3",
  description: "Christmas is almost here.."
)

track13 = saviours.tracks.create!(
  title: "Spirit",
  track_url: "/assets/tracks/spirit.mp3",
  description: "Christmas is almost here.."
)

saviours.playlists.create!(
  title: "Guardians of the Galaxy",
  tracks: [track1, track2, track3, track4, track5, track6, track7, track8, track9, track10, track11, track12, track13]
)
