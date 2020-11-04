# CampReviews
CampReviews is a project from the Udemy course 'The Web Developer' Bootcamp by Colt Steele.

# ![CampReviews ScreenShot](https://jg-s3-storage.s3.us-east-1.amazonaws.com/Camp_Reviews_Pagination_4665e15c24.gif?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMSJIMEYCIQDZeWEW8sfvPn%2FbbNZaEkr7m5028LoCyFkkEqwOIZhD3wIhALLze%2B8iS%2Fmhg%2BkP%2FgODaU6fPC%2Fv7jwYmc7HfDmDFewAKuQCCNz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQARoMNTYzMjQyMDkzNjM1IgyLtVTHm1NsZ692JBUquAInR1ddODRoOjvI%2FGJhONGBVyFLLaStxAjT6o8TYdwMr7Ob0DpnAloPTPKRV7qAl9shpMrUf8O2wpRK6t8txFOc1N3DEY%2FKesXViLfz7z1rL8bB6dhimbVt8B%2Fk%2B6bK55jlvNvFjnAJF1tImHKKVCC%2Fk6XZy4ClKIkjjDrvlJ22bohqqYIie9xPmUa2BItIGJ3IIkyPIz4AMX4QBofVrz5rs0qfYJn%2BAHfqxFZMenT%2F3Qmwj9U6lD%2FQv%2BsmnJIo1jZfIANo2HE6Nh0JymBhSXp6SU3be9fgCxGcF5Z5eQNibJ2DnUfqE563JPBqSP4yU9IOe%2B7i2%2BGiPZ%2FTje3QFa4yJCOawHOQjBcXbeSFwelW6hvnWl4cwoeb%2BWRAGEklbXrxHDj2ZD82Xqq29CjIpS8xdWq%2F3UbLcrMwjuSL%2FQU6rwLmMp0oz2qr%2BJ%2FukNDIA5X0GbmVxVpUbU%2B1GVHVrlZ0loc3aL9Fvj5PFYxhwlhTgYB7eEbDshvH2q9hgJIvApllzC6ZnWMqnuSllXkReIqGzLnTptPvVt72hh45q2D%2F%2F%2BXAA1NvjFAKRUZw62EumGhlhrjzxRlj3o8MfWK2NTIQjR9wmaNYItv%2B5zefuFcgEqX5HoIu8rBavXA2j%2B%2BBzBfXoJ5c9SpeaXrf%2FBJo8BIB2saUrypzgYiuyHwUgzYkM2K%2B9Hg3dvR2mk%2BE7J3tB0rKoWqLsvZXmpwsTOu6JRNZZSLiUynZcJaIXiG4zU9r%2BDWvQSLDQOZ%2FkdnK0uLmdqBUr0guPMFKK%2FiKcYeEIrE0ovza3l%2FNA0A6tg%2FoYZr88Ci6N25B%2BHbx4G%2FZ7IK2Bec%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20201104T192722Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAYGI6YJRBYFR2B5E2%2F20201104%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=2b73c659fe2c3683c91dcf213985dcf9743f6d37c1ac55ef3e60864473a55e0c)

Go to [CampReviews](https://jg-camp-reviews.herokuapp.com/campgrounds/page-1)

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
