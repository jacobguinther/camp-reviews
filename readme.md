# YelpCamp
YelpCamp is a project from the Udemy course 'The Web Developer' Bootcamp by Colt Steele.

### Front End
- ejs
- bootstrap
- feather-icons
### Back End
- nodejs
- express
- mongoDB
- mongoose
- passport

### Features
- Pagination
- Form Validation
- User Authentication (Passport)
- User Authorization (Passport)
- CRUD Operations for:
  - Campgrounds
  - Campground Comments

### Run It Locally
> These instructions are for MacOS

#### Download or Clone Down Repo
```sh
git clone https://github.com/jacobguinther/Portfolio-Website.git
cd Portfolio-Website
```
#### Install Dependencies
```sh
npm install
```
#### Start MongoDB  
I use homebrew to run MongoDB Locally   
If you dont already have it you can run:
```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```
#### Once Homebrew is installed:
```sh
brew tap mongodb/brew
brew install mongodb-community@4.2
brew services start mongodb-community@4.2
# To Stop: brew services stop mongodb-community@4.2
```
#### Make .env file
```sh
touch .env
echo "MONGODB_URI=mongodb://127.0.0.1:27017
PORT=3002
SESSION_SECRET="You can type whatever you want here or leave it as is" >> .env
```
#### Start YelpCamp
```sh
npm run start
```
#### Go to http://localhost:3002/ in your browser.