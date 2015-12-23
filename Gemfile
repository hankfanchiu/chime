source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.4'
# Pry is better than IRB
gem 'pry-rails'
# Use postgresql as the database for Active Record
gem 'pg'
# Authentication
gem 'bcrypt', require: 'bcrypt'
# FriendlyId for slugging
gem 'friendly_id'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
gem 'bootstrap-sass'
gem 'font-awesome-sass'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc
# Use Puma as the app server
gem 'puma'

gem 'newrelic_rpm'
# Rack Timeout
gem "rack-timeout"
# Amazon Web Services SDK for S3 file storage.
gem 'aws-sdk'
# Paperclip to handle pass-through image uploads.
# Paperclip 4 does not work with AWS SDK v2; must use this revision:
gem 'paperclip',
  git: 'https://github.com/thoughtbot/paperclip',
  ref: '523bd46c768226893f23889079a7aa9c73b57d68'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'
  gem 'binding_of_caller'
  gem 'better_errors'
  gem 'annotate'
  gem "dotenv-rails"
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end
