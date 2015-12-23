# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  username            :string           not null
#  email               :string           not null
#  session_token       :string           not null
#  password_digest     :string           not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  slug                :string
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#

class User < ActiveRecord::Base
  extend FriendlyId

  attr_reader :password

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  INVALID_USERNAMES = %w(discover collect login logout signup settings upload)

  after_initialize :ensure_session_token
  before_save :downcase_user_data
  before_save :randomize_avatar_basename

  friendly_id :username, use: :slugged

  validates :username,
    presence: true,
    uniqueness: { case_sensitive: false },
    exclusion: { in: INVALID_USERNAMES }

  validates :email,
    presence: true,
    format: { with: VALID_EMAIL_REGEX }

  validates :password,
    confirmation: true,
    length: { minimum: 6, maximum: 30, allow_nil: true }

  validates :password_confirmation,
    presence: true,
    allow_nil: true

  validates :session_token,
    presence: true,
    uniqueness: true

  validates_presence_of :password_digest

  has_attached_file :avatar,
    default_url: "/assets/corgi.jpg",
    url: ":s3_domain_url",
    path: "/users/images/avatar/:basename_:style.:extension",
    styles: {
      hero: '30x30>',
      thumb: '100x100>',
      square: '300x300#'
    }

  validates_attachment_size :avatar, { less_than: 5.megabytes }
  validates_attachment_content_type :avatar,
    content_type: ["image/jpeg", "image/gif", "image/png"]

  has_many :tracks, dependent: :destroy
  has_many :playlists, dependent: :destroy
  has_many :playlistings, through: :playlists

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def self.find_by_credentials(username, maybe_password)
    user = self.find_by(username: username.downcase)

    return nil unless user

    user.is_password?(maybe_password) ? user : nil
  end

  def self.search(query)
    self.where("username ILIKE ?", "%#{query}%")
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    saved_password = BCrypt::Password.new(self.password_digest)

    saved_password.is_password?(password)
  end

  def avatar_hero
    self.avatar.url(:hero)
  end

  def avatar_thumb
    self.avatar.url(:thumb)
  end

  def avatar_square
    self.avatar.url(:square)
  end

  private

  def downcase_user_data
    self.username = self.username.downcase
    self.email = self.email.downcase
  end

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

  def randomize_avatar_basename
    extension = File.extname(self.avatar_file_name)
    filename = "#{SecureRandom.uuid}#{extension}"

    self.avatar.instance_write(:file_name, filename)
  end
end
