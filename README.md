This is my solution of a [Roadmap backend project](https://roadmap.sh/projects/fitness-workout-tracker)

This project involves creating a backend system for a workout tracker application where users can sign up, log in, create workout plans, and track their progress. The system will feature JWT authentication, CRUD operations for workouts, and generate reports on past workouts.

## Requirements
You are required to develop an API for a workout tracker application that allows users to manage their workouts and track their progress. Your first task is to think about the database schema and the API endpoints that will be needed to support the application’s functionality. Here are some of the key features you should consider:

## Exercise Data
You should write a data seeder to populate the database with a list of exercises. Each exercise should have a name, description, and category (e.g., cardio, strength, flexibility) or muscle group (e.g., chest, back, legs). Exercises will be used to create workout plans.

## User Authentication and Authorization
Users will be able to sign up, log in, and log out of the application. You should use JWT tokens for authentication and authorization. Only authenticated users should be able to create, update, and delete workout plans. Needless to say, users should only be able to access their own workout plans.

Sign-Up: Allow users to create an account.
Login: Allow users to log in to their account.
JWT: Use JSON Web Tokens for authentication.

## Workout Management
Users will be able to create their workout plans. Workout plans should consist of multiple exercises, each with a set number of repetitions, sets, and weights. Users should be able to update and delete their workout plans. Additionally, users should be able to schedule workouts for specific dates and times.

Create Workout: Allow users to create workouts composed of multiple exercises.
Update Workout: Allow users to update workouts and add comments.
Delete Workout: Allow users to delete workouts.
Schedule Workouts: Allow users to schedule workouts for specific dates and times.
List Workouts: List active or pending workouts sorted by date and time.
Generate Reports: Generate reports on past workouts and progress.

```
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

//you can set query 

Endpoint: http://localhost:3000/workoutPlan?status=active

Endpoint: http://localhost:3000/workoutPlan?status=pending

Endpoint: http://localhost:3000/workoutPlan?sort=ASC

Endpoint: http://localhost:3000/workoutPlan?sort=DESC

Endpoint: http://localhost:3000/workoutPlan?status=active&sort=ASC

Method: GET



Endpoint: http://localhost:3000/workoutPlan/:id

Method: DELETE



Endpoint: http://localhost:3000/profile

Method: POST

Request body:{"age":23, "weight":75.0, "fitnessGoals":"lean"}



Endpoint: http://localhost:3000/profile

Method: GET
```
