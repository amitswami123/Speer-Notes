Packages and DB used (with reason)
Nest.js:

Modular Structure: Nest.js encourages a modular and organized structure for your application, making it easy to manage and scale.
Dependency Injection: Nest.js leverages the power of TypeScript and provides a robust dependency injection system, facilitating modular and testable code.
Middleware Support: Nest.js has excellent support for middleware, allowing you to execute logic before or after a request is handled by the route handler.
MongoDB:

Flexible Schema: MongoDB is a NoSQL database that allows for flexible and dynamic schema design. This is particularly useful in scenarios where the data structure can evolve over time.
Scalability: MongoDB is designed to scale horizontally, making it well-suited for applications that need to handle a large volume of data and scale horizontally across multiple servers or clusters.
Document-Oriented: MongoDB stores data in a JSON-like BSON format called documents. This makes it easy to work with data in a format that closely resembles how data is represented in most programming languages.
Passport Strategy:

Extensibility: Passport provides a modular and extensible authentication system. It supports a wide range of authentication mechanisms, known as strategies, which can be easily plugged into the application.
Middleware Integration: Passport integrates seamlessly with middleware in the Express.js framework, allowing you to incorporate authentication logic into your routes with minimal effort.
Community Support: Passport is a widely used library with a large and active community. This means that there is extensive documentation, and you can find a strategy for almost every authentication provider.
passport-jwt:

JSON Web Token (JWT) Support: passport-jwt is a Passport strategy for authenticating with JSON Web Tokens. JWT is a widely adopted standard for token-based authentication.
Stateless Authentication: JWTs enable stateless authentication, meaning the server doesn't need to store session information. This is particularly advantageous in a microservices architecture.
Token Expiry: JWTs can include an expiration time, enhancing security by automatically invalidating tokens after a certain period.
Throttler:

Rate Limiting: Throttler modules in Nest.js, such as nestjs-rate-limiter, allow you to implement rate limiting for your API endpoints, protecting your server from abuse and ensuring fair usage.
Customizable Policies: Throttlers often provide flexible policies, allowing you to define rules for different routes or user roles. This customization helps tailor rate limiting to the specific needs of your application.
Prevent Brute Force Attacks: Throttling can be used to prevent brute force attacks by limiting the number of login attempts within a certain time frame.




keep in mind all the APIs is authenticated and throlled

setup locally to run APIs:
1. clone the repo and setup mongoDB
2. use node>=16 and install packages using npm i
3. If still some packages unable to install, intall it manually from packages and imports
4. now you are ready to run using npm run start:dev


Thanks 
