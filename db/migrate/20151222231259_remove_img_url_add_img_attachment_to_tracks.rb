class RemoveImgUrlAddImgAttachmentToTracks < ActiveRecord::Migration
  def change
    remove_column :tracks, :img_url

    add_attachment :tracks, :img
  end
end
