class CreatePlaylistings < ActiveRecord::Migration
  def change
    create_table :playlistings do |t|
      t.integer :playlist_id, null: false
      t.integer :track_id, null: false

      t.timestamps null: false
    end

    add_index :playlistings, [:playlist_id, :track_id], unique: true
  end
end
