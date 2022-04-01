# Ka-Chat
Full Stack Realtime Chat Application using React & Firebase

![Ka-Chat Logo](https://github.com/Ken-Yokohama/Ka-Chat/blob/master/public/images/ka-chat-logo1.png?raw=true)

### Brief Summary
Ka-Chat is a Full-Stack Realtime Chat Application created using React in the Frontend and Firebase as the CMS. Here, users are able to message each other thru a 1 on 1 chat encrypted with firebase security rules to keep messages private and secure, personalize their profile and avatar as well as login to their account using email or google authentication.

### Links:
- [Live Preview](https://ken-yokohama.github.io/Ka-Chat)

![Ka-Chat Cover Sample](https://github.com/Ken-Yokohama/Ka-Chat/blob/master/cover.JPG?raw=true)

### Features:
- Email and Token Based User Authentication
- Encrypted 1 on 1 Chats using Firebase Security Rules
- Fully Responsive Grid and Flexbox Layout
- User Profile Information w/ Profile Avatar
- User Search Query and filtering

### Technologies & Templates Used
| Technologies | Usage                                      |
| ----------------- | ------------------------------------------------ |
| React Router Dom | Navigation & Routing |
| Material UI | CSS Components, Styles & Icons       |
| Firebase Google Authentication      | Login & Authentication      |
| Firebase Firestore     | Real Time Database      |
| Npm GH-Pages | Web Hosting |

### How to run locally
```
git clone https://github.com/Ken-Yokohama/Ka-Chat.git

cd Ka-Chat
npm start
```

**Note You'll have to create your own firebase project and paste your project API Keys into a .env file to be able to use your own personal version of Ka-Chat

### Version Logs
V1.0 29 Mar '22 - Original Release

- Created React App
- Installed Npm Packages (MUI, Firebase, React-Icons & React-Router-Dom)
- Organized Files following Best Practices for Components, Containers & Pages
- Added Firebase Config & Environment Variables
- Added Authentication w/ Email using Firebase Auth
- Added Authentication w/ Google using Firebase Google Auth Provider
- Created "Users" DB using Firestore Database
- Added Private Routes for Authenticated Users
- Added Login Page w/ CSS and Background Images
- Added CSS Grid and Flexbout Layout for Chat Menu Container, Menu, ChatMain and Settings
- Added Popover to Settings

V1.1 30 Mar '22 - Added Database Functions and Security

- Added Logic to Authentication which adds a user to the "Registered Users" DB if the user isn't found in the database
- Added Logic to display registered users and get the user object when a user is selected from the search dropdown options
- Added Logic and Security rules to create 1-1 chat data ref to chat messages after clicking a user from the search dropdown options
- Fixed Responsiveness for displaying both chat menu and chat when using desktop
- Added Input Feilds and Security Rules to only allow users to access their own chats
- Succesfully Pulled and used sorting functions to order chat data by timestamp without using a cloud index
- Added Dynamic styles for messages sent and received


V1.2 31 Mar '22 - Pre Deployment and Deployment

- Added proper routing for previous chats in selected menu
- Added Color Themes to the Chat container as well as Background Images
- Designed and Added Logo
- Added Modal and Functions to update Avatar Data
- Added Avatars to the Chat Menu, Chat Messages and Chat Header
- Fixed Image Routes due to changes from switching from Browser Router to Hash Router
- Added Favicons and Webpage Title
- Converted Webpage from using 100vh to 100% to be more responsive for ios devices
- Deployed Website
