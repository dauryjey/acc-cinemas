# Endpoints

(Just for reference - OUTDATED)

### User Endpoints
**POST /users**
Request Body: { "first_name": "string", "last_name": "string", "username": "string", "password": "string", "is_admin": "boolean" }
Description: Creates a new user account.

**POST /login**
Request Body: { "username": "string", "password": "string" }
Description: Authenticates the user and returns a token.

**GET /users/{id}**
Description: Retrieves the details of a specific user.

### Theater Endpoints
**GET /theaters**
Description: Retrieves a list of all theaters.

**GET /theaters/{id}** (Admin Only)
Description: Retrieves details of a specific theater.
 
**POST /theaters** (Admin Only)
Request Body: { "name": "string", "address": "string", "city": "string" }
Description: Creates a new theater.

**PUT /theaters/{id}** (Admin Only)
Request Body: { "name": "string", "address": "string", "city": "string" }
Description: Updates details of a specific theater.

**DELETE /theaters/{id}** 
Description: Deletes a specific theater.

### Screen Endpoints
**GET /screens**
Description: Retrieves a list of all screens.

**GET /screens/{id}** (Admin Only)
Description: Retrieves details of a specific screen.

**POST /screens**** (Admin Only)
Request Body: { "name": "string", "max_quantity": "integer", "theater_id": "integer" }
Description: Creates a new screen.

**PUT /screens/{id}** (Admin Only)
Request Body: { "name": "string", "max_quantity": "integer", "theater_id": "integer" }
Description: Updates details of a specific screen.

**DELETE /screens/{id}**
Description: Deletes a specific screen.

### Movie Endpoints
**GET /movies**
Description: Retrieves a list of all movies.

**GET /movies/{id}** (Admin Only)
Description: Retrieves details of a specific movie.

**POST /movies** (Admin Only)
Request Body: { "title": "string", "sinopsis": "string", "duration": "integer", "rated": "string" }
Description: Creates a new movie.

**PUT /movies/{id}** (Admin Only)
Request Body: { "title": "string", "sinopsis": "string", "duration": "integer", "rated": "string" }
Description: Updates details of a specific movie.

**DELETE /movies/{id}**
Description: Deletes a specific movie.

### Showtime Endpoints
**GET /showtimes**
Description: Retrieves a list of all showtimes.
Get Showtime Details

**GET /showtimes/{id}** (Admin Only)
Description: Retrieves details of a specific showtime.

**POST /showtimes** (Admin Only)
Request Body: { "date": "string", "start_time": "string", "end_time": "string", "screen_id": "integer", "movie_id": "integer" }
Description: Creates a new showtime.

**PUT /showtimes/{id}** (Admin Only)
Request Body: { "date": "string", "start_time": "string", "end_time": "string", "screen_id": "integer", "movie_id": "integer" }
Description: Updates details of a specific showtime.

**DELETE /showtimes/{id}**
Description: Deletes a specific showtime.

### Ticket Endpoints
**GET /tickets**
Description: Retrieves a list of all tickets.

**GET /tickets/{id}**
Description: Retrieves details of a specific ticket.
 
**POST /tickets** (Admin Only)
Request Body: { "quantity": "integer", "total_price": "float", "user_id": "integer", "showtime_id": "integer" }
Description: Creates a new ticket.

**PUT /tickets/{id}** (Admin Only)
Request Body: { "quantity": "integer", "total_price": "float", "user_id": "integer", "showtime_id": "integer" }
Description: Updates details of a specific ticket.

**DELETE /tickets/{id}**
Description: Deletes a specific ticket.