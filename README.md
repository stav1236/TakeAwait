# TakeAwait

Server-side project for restaurant order management.

## Usage

### Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (includes npm)

### Running the Project

1. **Clone the repository:**
    ```bash
    git clone https://github.com/stav1236/TakeAwait.git
    ```

2. **Navigate to the TakeAwait folder:**
    ```bash
    cd TakeAwait
    ```

3. **Install dependencies:**
    ```bash
    npm i
    ```

4. **Run the project:**
    - **Development mode:**
    ```bash
    npm run start
    ```
    - **Watch mode:**
    ```bash
    npm run start:dev
    ```
    - **Production mode:**
    ```bash
    npm run start:prod
    ```

## Implementation
The project is implemented using Nest framework TypeScript.

## Environment Variables
For each runtime environment, we need to create a suitable environment file named `.env.${process.env.NODE_ENV}`. For example, for running the development environment, we would create a file named `.env.development`. 

The following environment variables are required:

- `PORT`: Specifies the port on which the server will run.
- `DB_URL`: Specifies the address of the DB server.

These environment variables ensure proper configuration and connectivity for the server-side project.

## API Documentation
The system uses Swagger to document the functionality of the project. Swagger can be accessed by running the project and navigating to the path `/api-doc`.

## Folder Structure
- **common**
  - **config**: Contains configuration files for the project, such as database configuration, logging configuration, etc.
  - **exceptions**: Houses custom exception classes used in the project.
  - **middlewares**: Contains middleware functions that are executed before or after route handlers.
  - **models**: Contains data models or schemas used throughout the application.
  - **pipes**: Houses custom pipe classes used for data transformation or validation.
  - **utilities**: Contains utility functions or helper classes used across different parts of the project.

- **jobs**: Contains scripts or modules responsible for performing background tasks or scheduled jobs, such as generating reports, sending emails, etc.

- **modules**: Represents the core business logic of the application, typically organized by feature or entity. Each module may contain its own set of controllers, services, DTOs (Data Transfer Objects), repositories, etc. This folder structure allows for a modular and scalable architecture.

This folder structure helps in maintaining a well-organized codebase, improving code readability, and facilitating code reuse across different parts of the application.

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.
