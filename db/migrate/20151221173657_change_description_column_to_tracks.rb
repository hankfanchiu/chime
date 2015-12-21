class ChangeDescriptionColumnToTracks < ActiveRecord::Migration
  def change
    change_column :tracks, :description, :text, default: nil
  end
end
