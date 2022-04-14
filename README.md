

<h1 align="center">
  Politique 
</h1>
  
 

<p align="center" >
  <a href="#about"> About </a> &nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;
  <a href="#realtime-chat">Realtime chat</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#application-features">Gifs</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#getting-started">Getting started </a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#techs">Techs</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">License</a>
</p>


<p align="center">
  <a href="https://github.com/eulazzo" target="_blank">
    <img src="https://img.shields.io/static/v1?label=author&message=eulazzo&color=1877f2&labelColor=008000" alt="Github"> 
  </a>
    <img src="https://img.shields.io/github/stars/eulazzo/Sigma?color=1877f2&labelColor=008000" alt="Stars">
  <img src="https://img.shields.io/github/last-commit/eulazzo/Sigma?color=1877f2&labelColor=008000" alt="Commits">
  <img src="https://img.shields.io/static/v1?label=license&message=MIT&color=1877f2&labelColor=008000" alt="License">
</p>


# Politique
- Backend for politique social media, with register, login, create/delete/follow/unfollow users etc.


## DOCUMENTATION 

* Clone this repo;
* run `npm install` to add all depedencies;
* Create an `.env` inside the `config` folder and fill in all the necessary keys:
  ```
   PORT= 
   MONGO_URL= 
  ```

* run `npm run start` to start the server

## Endpoints

* ### signUp
  * Method: POST
  * Path: `/user/register`
  * input:
    ```
     {
       "email":"lorena@ctemplar.com",
       "password":"12345678",
       "pseudo":"ilorena"
     }
     
    ``` 
   * Output: (email,password and pseudo is mandatory, will return a error in case one of them is missing)
     ```
     {
       "user": "625383b327ea69ca9eff24ad"
     }
     ```
 
* ### Login
  * Method: POST
  * Path: `/user/login`
  * Input:  
    ```
     {
	"email":"luis@ctemplar.com",
	"password":"12345678"
     }
    ```
   * Ouput
     ```
      { "user": "6254bf7deba132bfff54d07a" }
     ```
<!-- 
* ### Logout
  * Método: GET
  * Path: `/user/logout`
  * Input:  
    ```
     {
	"email":"luis@ctemplar.com",
	"password":"12345678"
     }
    ```
  * Ouput
    ```
     "No cookies for you"
    ```
 -->
* ### getAllOrders
  * Method: GET
  * Path: `/user`
  * Output: 
    ```
    [
	{
		"_id": "625379aa930bdc846ce5b2af",
		"pseudo": "eulazzo",
		"email": "lazaro@ctemplar.com",
		"picture": "./uploads/profile/random-user.png",
		"followers": [],
		"following": [
			"625383b327ea69ca9eff24ad"
		],
		"likes": [],
		"createdAt": "2022-04-11T00:43:22.139Z",
		"updatedAt": "2022-04-11T01:45:29.506Z",
		"__v": 0
	},
	{
		"_id": "625383b327ea69ca9eff24ad",
		"pseudo": "ilorena",
		"email": "lorena@ctemplar.com",
		"picture": "./uploads/profile/random-user.png",
		"followers": [
			"625379aa930bdc846ce5b2af"
		],
		"following": [],
		"likes": [],
		"createdAt": "2022-04-11T01:26:11.375Z",
		"updatedAt": "2022-04-11T01:45:29.552Z",
		"__v": 0
	}
    ] 
    ```


* ### userInfo
  * Method: GET
  * Path: `/user/:id`
  * Output:
    ```
    {
      "_id": "625379aa930bdc846ce5b2af",
      "pseudo": "eulazzo",
      "email": "lazaro@ctemplar.com",
      "picture": "./uploads/profile/random-user.png",
      "followers": [],
      "following": [],
      "likes": [],
      "createdAt": "2022-04-11T00:43:22.139Z",
      "updatedAt": "2022-04-11T01:50:23.374Z",
      "__v": 0
    }
    ```
 
 * ### updateUser
   * Method: GET
   * Path: `/user/:id`
   * Input:
     ```
      {
       "bio": "Write here you new bio"
      }
     ```
   * Output:
     ```
     {
       "_id": "62535e753c44e2ddf6f5d793",
       "__v": 0,
       "bio": "Then you new bio will be updated",
       "createdAt": "2022-04-11T02:32:32.907Z",
       "followers": [],
       "following": [],
       "likes": [],
       "picture": "./uploads/profile/random-user.png",
       "updatedAt": "2022-04-11T02:32:32.907Z"
      }
     ```
  
 * ### updateUser
   * Method: GET
   * Path: `/user/:id`
   * Input:
     ```
       {"bio": "Write here you new bio"}
     ```
   * Output:
     ```
       {
         "_id": "62535e753c44e2ddf6f5d793",
         "__v": 0,
         "bio": "Then you new bio will be updated",
         "createdAt": "2022-04-11T02:32:32.907Z",
         "followers": [],
         "following": [],
         "likes": [],
         "picture": "./uploads/profile/random-user.png",
         "updatedAt": "2022-04-11T02:32:32.907Z"
       }
     ```
 
 * ### deleteUser
   * Method: DELETE
   * Path: `/user/:id`
   * Input: _id
     ```
	 {
	   "_id":"62535e753c44e2ddf6f5d793"
         }
     ```
   * Output (Sucess)
     ```
      { "message": "Succesfully deleted. "}
     ```
  
   * Ouput (failure)
     ```
      ID unknown: 65393cecf7155ba4bac2edc
     ```
 
  * ### follow
    * Method: PATCH
    * Path: `/user/follow/:id`
    * Input:  
      ```
        {
	  "idToFollow":"625383b327ea69ca9eff24ad"   
        }
      ```
    * Ouput
      ```
       {
	  "_id": "625379aa930bdc846ce5b2af",
	  "pseudo": "eulazzo",
	  "email": "lazaro@ctemplar.com",
	  "password": "$2b$10$U/K53Ic8NC8BcMcBhy2..OFacdNDNJv.fFuOGdBy0SseAvaM8wZKm",
	  "picture": "./uploads/profile/random-user.png",
	  "followers": [],
	  "following": [
	  "625383b327ea69ca9eff24ad"
	  ],
	  "likes": [],
	  "createdAt": "2022-04-11T00:43:22.139Z",
	  "updatedAt": "2022-04-11T01:45:29.506Z",
	  "__v": 0
       }
      ```
  
  * ### unfollow
    * Method: PATCH
    * Path: `/user/unfollow/:id`
    * Input:  
      ```
      {
       "idToUnfollow":"625383b327ea69ca9eff24ad"   
       }
      ```
    * Ouput
      ```
       {
        "_id": "625379aa930bdc846ce5b2af",
        "pseudo": "eulazzo",
        "email": "lazaro@ctemplar.com",
        "password": "$2b$10$U/K53Ic8NC8BcMcBhy2..OFacdNDNJv.fFuOGdBy0SseAvaM8wZKm",
        "picture": "./uploads/profile/random-user.png",
        "followers": [],
        "following": [],
        "likes": [],
        "createdAt": "2022-04-11T00:43:22.139Z",
        "updatedAt": "2022-04-11T01:50:23.374Z",
        "__v": 0
       }
      ```

 
## Techs used

 <li> Node.Js </li>
 <li> MongoDB </li>
 <li> Javascript </li>
 <li> Express </li>
 <li> Mongoose </li>
 <li> Jwt Authentication </li>
 <li> Bcrypt </li>
