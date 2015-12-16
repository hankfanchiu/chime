# == Schema Information
#
# Table name: tracks
#
#  id          :integer          not null, primary key
#  artist_id   :integer          not null
#  title       :string           not null
#  track_url   :string           not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class TrackTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
