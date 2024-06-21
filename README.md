# Backend API Documentation 
### Cloud Computing backend for CERIA APP

## API URL
```bash
    http://localhost:3000
```

## API Endpoints

## USER
### User

- **URL**: `/user`
- **Method**: `POST`
- **Description**: User data from Spotify Token.
- **request**: Spotify Token
- **bearer token**: Token
- **Response**:
    ```json
    {
    "status": true,
    "message": "Already ada",
    "data": {
        "user_id":,
        "user_email":,
        "user_display_name":
        },
      "token":
  }
    ```
### Get User By Id

- **URL**: `/user/user_id`
- **Method**: `GET`
- **Description**: User data from Spotify Token.
- **request**: Spotify Token
- **bearer token**: Token
- **Response**:
    ```json
    {
    "status": true,
    "message": "User profile retrieved successfully",
    "data": {
        "user_display_name":,
        "user_email":
        }
    }
    ```

## SESSION 

### Start Session
- **URL**: `/listenSession`
- **Method**: `POST`
- **Description**: Start Session
- **bearer token**: Token
- **Response**:
    ```json
    {
    "status": true,
    "message": "Song added to session",
    "data": {
        "listenSession": {
            "listen_id": ,
            "user_id":
            }
        }
    }
    ```

### Get listen Session By UserId
- **URL**: `/listenSession`
- **Method**: `GET`
- **Description**: Get listen Session By UserId
- **bearer token**: Token
- **Response**:
    ```json
    {
    "status": true,
    "message": "Listen session retrieved successfully",
    "data": [
        {
            "listen_id":,
            "_count": {
                "Session":
                  }
          }
        ]
    }
    ```
### Get Song In Session
- **URL**: `/listenSession/listen_id`
- **Method**: `GET`
- **Description**: Get listen Session By listen_id
- **bearer token**: Token
- **Response**:
    ```json
    {
    "status": true,
    "message": "Song added to session",
    "data": {
        "sessions": []
      }
    }
    ```

### Recommendations
- **URL**: `/recommend`
- **Method**: `GET`
- **Description**: Get recommendation Songs
- **bearer token**: Token
- **Response**:
    ```json
    [
    " ",
    " ",
    " "
    ]
    ```
