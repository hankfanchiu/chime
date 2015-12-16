class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.integer :artist_id, null: false
      t.string :title, null: false
      t.string :track_url, null: false
      t.text :description

      t.timestamps null: false
    end

    add_index :tracks, :track_url, unique: true
  end
end
