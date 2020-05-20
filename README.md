# Memestagram

### Link to live app: https://memestagram.now.sh/

### Link to heroku server: https://pacific-beach-23085.herokuapp.com/api

## API Documentation

### POST/api/auth/login

Login user account. Requires a request body

 POST https://pacific-beach-23085.herokuapp.com/api/auth/login
 
  REQ BODY: { "name": "Demo_user", "username": "Demo", "Password": "Demopass123!" }

  HTTP STATUS 201 Created
  
  Location: https://pacific-beach-23085.herokuapp.com/api/auth/login
  
  {
    
    "id": "1",
    
    "user_name": "Demo",
    
    "Password": "Demopass123!"
    
  }
  
### POST/api/users

Create a new user account. Requires a request body.

 POST https://pacific-beach-23085.herokuapp.com/api/user
 
  REQ BODY: { "user_name": "Demo", "user_age": "1" , "password":"Demopass123!"}

  HTTP STATUS 201 Created
  
  Location: https://pacific-beach-23085.herokuapp.com/api/users
  
  { 
  
    "id":"1",

    "userImg": "https://i.insider.com/5c59e77ceb3ce80d46564023?width=600&format=jpeg&auto=webp",

    "name": "Demo_user",
    
    "username": "Demo",
    
    "password":"Demopass123!"
    
  }

### PATCH/api/users/:user_id

Updated username. Requires a request body.

PATCH https://pacific-beach-23085.herokuapp.com/api/users/:user_id

REQ BODY: { 
    
    "username":"Andy",
    
    "user_id":"1",
  
   }

  HTTP STATUS 204 No Content 
  
  Location: https://pacific-beach-23085.herokuapp.com/api/users/:user_id

  
### GET/api/posts

Provides array of posts object of all users.

GET https://pacific-beach-23085.herokuapp.com/api/posts

  HTTP STATUS 200 OK
  
  [{
  
    "id":"1",
    
    "memeImg":"https://live.staticflickr.com/5611/15033991623_66352974b6_z.jpg",
    
    "description":"When you know you messed up...",
    
    "likes":"0",
    
    "user_id":"1",
    
  },
  
    {
    
    "id":"2",
      
    "memeImg":"https://live.boy.com/5611/15033991623_66352974b6_z.jpg",
    
    "description":"My son is so funny",
    
    "likes":"0",
    
    "user_id":"2",
    
    }
    
  ]

### POST/api/posts

Create a new posts. Requires a request body.

POST https://pacific-beach-23085.herokuapp.com/api/posts

  REQ BODY: { 
  
    "memeImg":"https://live.boy.com/5611/15033991623_66352974b6_z.jpg",
    
    "description":"My son is so funny",
    
    "likes":"0",
    
    "user_id":"2",
  
   }

  HTTP STATUS 201 Created
  
  Location: https://pacific-beach-23085.herokuapp.com/api/posts
  
  {
  
    "memeImg":"https://live.boy.com/5611/15033991623_66352974b6_z.jpg",
    
    "description":"My son is so funny",
    
    "likes":"0",
    
    "user_id":"2",
    
  }

### PATCH/api/posts

Calculate the number of likes. Requires a request body.

PATCH https://pacific-beach-23085.herokuapp.com/api/posts

REQ BODY: { 
    
    "likes":"0",
    
    "posts_id":"1",
  
   }

  HTTP STATUS 204 No Content 
  
  Location: https://pacific-beach-23085.herokuapp.com/api/posts

### DELETE/api/posts

Deletes data matching id parameter from the posts.

Example request/response:

  DELETE https://pacific-beach-23085.herokuapp.com/api/posts
    
  HTTP STATUS 204 No Content
  
  {} (empty)

### GET/api/posts/users/:user_id

Get specific user's posts by matching id parameter from the users.

GET https://pacific-beach-23085.herokuapp.com/api/posts/users/:user_id

  HTTP STATUS 200 OK
  
  [{
  
    "id":"1",
    
    "memeImg":"https://live.staticflickr.com/5611/15033991623_66352974b6_z.jpg",
    
    "description":"When you know you messed up...",
    
    "likes":"0",
    
    "user_id":"1",
    
  },

  {
  
    "id":"2",
    
    "memeImg":"https://live.staticflickr.com/5611/15033991623_66352974b6_z.jpg",
    
    "description":"When you want to sleep...",
    
    "likes":"0",
    
    "user_id":"1",
    
  }]

### GET/api/posts/:post_id

Get specific post by matching id parameter from the posts.

GET https://pacific-beach-23085.herokuapp.com/api/posts/:post_id

  HTTP STATUS 200 OK
  
  [{
  
    "id":"1",
    
    "memeImg":"https://live.staticflickr.com/5611/15033991623_66352974b6_z.jpg",
    
    "description":"When you know you messed up...",
    
    "likes":"0",
    
    "user_id":"1",
    
  }]

### GET/api/comments/:post_id

Get specific post's comments by matching id parameter from the posts.

GET https://pacific-beach-23085.herokuapp.com/api/comments/:post_id

  HTTP STATUS 200 OK
  
  [{
  
    "id":"1",
    
    "comment":"I love it",
    
    "posts_id":"1",
    
    "user_id":"1",
    
  },
  {
  
    "id":"2",
    
    "comment":"It's amazing",
    
    "posts_id":"1",
    
    "user_id":"3",
    
  }
  ]


### POST/api/comments/:post_id

Post a comment on the post that match the id parameter from the posts.

REQ BODY: { 
  
   "comment":"I love it",
    
    "posts_id":"1",
    
    "user_id":"1",
  
   }

  HTTP STATUS 201 Created
  
  Location: https://pacific-beach-23085.herokuapp.com/api/posts/:post_id
  
  {
  
     "id":"1",
    
    "comment":"I love it",
    
    "posts_id":"1",
    
    "user_id":"1"
    
  }

## How to use the Memestagram

If you are a new user, please register an account.

![1](https://user-images.githubusercontent.com/47201201/81482880-05e00480-91ef-11ea-8c3d-0c5104fb75e0.png)

If you already have an account please log in

![2](https://user-images.githubusercontent.com/47201201/81482894-14c6b700-91ef-11ea-927f-2a7d5bb6380e.png)

After logging in you can see other users' posts

Click on the trash can to delete your post

Click a heart to add likes to that post

![dash](https://user-images.githubusercontent.com/47201201/82391536-6264d000-99f6-11ea-8c12-7f9766038d5f.png)

Click on a username to see more memes from the user

![user](https://user-images.githubusercontent.com/47201201/82391497-4cefa600-99f6-11ea-8e2e-a62ee7d095ad.png)

Click on commnet or image to to add and see comments

![post](https://user-images.githubusercontent.com/47201201/82391499-4e20d300-99f6-11ea-973a-ff9a927637fd.png)


Click on "AddPost" to create a new posts

![add](https://user-images.githubusercontent.com/47201201/82391513-55e07780-99f6-11ea-8881-e82ca797e746.png)

Click on "Edit" to edit their username:

![edit](https://user-images.githubusercontent.com/47201201/82391504-51b45a00-99f6-11ea-85c2-0c7da5727d0e.png)


Click your profile image to see all of your posts

![own](https://user-images.githubusercontent.com/47201201/82391496-4c570f80-99f6-11ea-89a9-0cdb9d3525a3.png)


### What is Memestagram

Memes are one of the greatest symbols of social media.
They’re edgy. They’re funny. They’re easy to iterate on, and every week, a new one pops up.
But despite their popularity, it seems like there is no place for us to share or collect them. Memestagram is here for you! It’s a meme only platform. Whether you want to share the meme that you create or look for some interesting memes. Just join us!

### Features

-set up the user's own account with their profile image

-calculate the total likes and comments for each post

-click on user name to see all posts from that user

-click on the posts image or comment button to see the comments and add comment

-click on edit to update the username

-allow for users to add a comment or click like on others' posts

-keep users' posts in their account

-allow users to delete their posts

### Authors

| Name | Role | Github Profile |
| :-------------: |:-------------:|:-------------:|
| Lillian Burnside | Project Manager | [link](https://github.com/LilyBurnside) |
| Cesar Hernandez | Product Manager | [link](https://github.com/Poden) |
| Hsin Ling Hu | UI/UX Lead | [link](https://github.com/hsinlinghu1101) |
| Christian Shim | QA Lead | [link](https://github.com/shimmy77) |

 ### Technology used 
 
 React, CSS, Node, Express, and PostgreSQL.
