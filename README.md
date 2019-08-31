![](https://github.com/nmeisburger0/forum/blob/master/public/images/forumLogin.PNG)

# forum
Forum is web app that allows users to share their ideas and view the ideas shared by others. The app allows users to create an account, login and write posts for that explain their idea. Other users can then view the ideas that have been posted on the app and up vote the ones they like the best. The app also provides an admin level access that allows for the monitoring and removal of posts.

## Development 

The following assumes that you have mongodb installed on your computer. You can check this by running 
`$ mongod --version` and `$ mongo --version`

### Running the app locally in development mode

1. Run `$ npm install` to install the necessary dependencies for the app.

2. The app creates a default admin account when launched. The email and password for this admin account can be set from the `.env` file. Note that once the app instance is running this initial admin account will be able to promote other users to admin status.

3. Run `$ mongod` from your terminal to setup the database.

4. Run `$ npm run start` to run the app using node to run the server. This means that the local version of the server you are running will not reflect any changes made to the backend until you stop and rerun the server.

5. Run `$ npm run dev` to run the app using nodemon to run the server. This means that the local version of the server will automatically update as you make changes to the backend, without having to stop and rerun the server.

#### Notes on development
The app defaults to using `http://localhost:3000` to locally serve the app. This can be changed by adding a `PORT` environment variable in the `.env` file.

The app defaults to using `mongodb://localhost/forum` as the database for the app. This can be changed by changing the value of the `DB_ROUTE` environment variable in the `.env` file.

![](https://github.com/nmeisburger0/forum/blob/master/public/images/forumHome.PNG)

## App Overview
Upon reaching the app users will be able to see a list of the posts already made on the app, and will have the opportunity to login or create an account. Once logged in they will be able to write their own posts and upvote others' posts. Additionally they will have a page that allows them to view their posts and delete them should they desire. The app also supports admin users. Be default an admin account is created when the app is launched with the admin email and password provided as environment variables in the `.env` file, this allows them to be set when an instance of the app is launched. Admins will have additional pages when they login that will allow them to see a full list of posts that show the author's name, as well as see a full list of active accounts. They will also be able to delete posts from the posts page, and from the users page they will be able to remove accounts and promote other users to admin status. Finally all users will be able to see a page that contains a ranked list of the top 5 most popular posts on the app instance.

## Contributors
- Nicholas Meisburger ([nmeisburger0](https://github.com/nmeisburger0))
