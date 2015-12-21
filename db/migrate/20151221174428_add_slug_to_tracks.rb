class AddSlugToTracks < ActiveRecord::Migration
  def change
    add_column :tracks, :slug, :string
    add_index :tracks, [:user_id, :slug], unique: true
    add_index :tracks, [:user_id, :title], unique: true
  end
end
