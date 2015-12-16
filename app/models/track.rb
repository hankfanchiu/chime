# == Schema Information
#
# Table name: tracks
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  title       :string           not null
#  track_url   :string           not null
#  img_url     :string
#  description :text             default("")
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Track < ActiveRecord::Base
  before_save :ensure_img_url

  validates_presence_of :user_id, :title

  validates :track_url,
    presence: true,
    uniqueness: true

  belongs_to :user

  private

  def ensure_img_url
    self.img_url = "/assets/corgi.jpg" if self.img_url.nil?
  end
end
