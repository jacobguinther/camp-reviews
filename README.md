<h1 align="center">CampReviews</>
<h4 align="center">A place where users can post and review campgrounds</a>.</h4>

# ![CampReviews ScreenShot](./gifs/CampReviewsDemoGif.gif)

Go to [CampReviews](http://3.136.17.154/)

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
  - Campground Reviews

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
#### Start CampReviews
```sh
npm run start
```
#### Go to http://localhost:3002/ in your browser.
