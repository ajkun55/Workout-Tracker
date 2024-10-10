This is my solution of a [Roadmap backend project](https://roadmap.sh/projects/fitness-workout-tracker)



Endpoint: http://localhost:3000/auth/register

Method: POST

Request body: {"username":"123", "email":"123@a.com", "password":"123456"}



Endpoint: http://localhost:3000/auth/login

Method: POST

Request body: {"email":"123@a.com", "password":"123456"}

//Get Response {token: tokenvalue}



Below is protected routes, you need to add Bearer Token as Auth when request.



Endpoint: http://localhost:3000/exercises

Method: POST

Request body:{"name":"Running", "description":"running", "category":"cardio"}  or {"name":"Squat", "description":"lift weight", "category":"strength","muscle_group":"leg"}



Endpoint: http://localhost:3000/exercises

Method: GET



Endpoint: http://localhost:3000/exercises/:id

Method: GET



Endpoint: http://localhost:3000/exercises/:id

Method: PUT

Request body:{"name":"Running updated", "description":"running", "category":"cardio"} 



Endpoint: http://localhost:3000/exercises/:id

Method: DELETE



Endpoint: http://localhost:3000/workoutPlan

Method: POST

Request body:{"exercises":["running","press","rope"],"date":"2024-10-09","time":"14:30", "weight":90.0, "reps":20, "sets":5}



Endpoint: http://localhost:3000/workoutPlan

Method: GET



Endpoint: http://localhost:3000/workoutPlan/:id

Method: DELETE



Endpoint: http://localhost:3000/profile

Method: POST

Request body:{"age":23, "weight":75.0, "fitnessGoals":"lean"}



Endpoint: http://localhost:3000/profile

Method: GET