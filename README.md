# Tech-Pros-API
TASK 1
➠Concurrency - Not locking when another operation is running.

➠Caching - Inefficient caching might increase database call.

➠Indexing - Improper indexing will make frequently used query to be slower than when properly indexed.

➠Inefficient data models- Leads to complex slow queries.

SOLUTION
➠Concurrency- make use of locks to control access to data and prevent concurrent updates that usually leads to conflicts.
➠Caching- make use of in-memory caches to store frequently accessed data, reducing the need to query the database repeatedly.
➠Indexing- select appropriate index types based on the query patterns and data characteristics.
➠Inefficient data models-strike a balance between normalization and denormalization based on query patterns.

TASK 2

(API for user authentication, course enrollment and user information retrieval)

The first step to User Authentication was to create the models needed. In this case, the Admin and Student Models.
The Controllers handled the functions and were responsible for handling incoming requests and returning responses to the client.

The Database used is MongoDB.

JsonWebToken,Bcryptjs and Validator are some of the npm packages used for the process of user creation and authentication. 

Users can create and login to their accounts, and authorization is implemented to prevent unauthorized access to certain routes.
POST/register = Create a new student.
POST/login = Student login route
GET/profile = Student can view their individual profiles
GET/:id = View a student (Admins only)
GET/ = View all students (Admins only)

The admin routes includes:
POST/register - Create a new admin
POST/login - Admin login route

Admins create courses,and follow a guideline as stated by the ‘Course Model’.
POST/create-new-course = Creates a new course (Admins only)
GET/all-courses = Shows all the courses available on the platform
GET/:id = Shows the course whose id was given
PATCH/:id/subscribe = Link for the student to subscribe to a particular course.




