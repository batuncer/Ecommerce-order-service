# Order Service

The Order Service is a backend service responsible for handling order management in an e-commerce application. This service allows for creating orders, retrieving order details, and processing orders through integration with other services like Product and User services.

## Features

- Create new orders with product and user details.
- Retrieve all orders.
- Retrieve orders by user ID.
- Integration with RabbitMQ for message queuing.
- RESTful API architecture.

## Technologies Used

- Node.js
- Express.js
- Sequelize (ORM)
- PostgreSQL (Database)
- Axios (HTTP Client)
- RabbitMQ (Message Broker)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [Related Projects](#related-projects)

## Installation

To set up the Order Service locally, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/order-service.git
   cd order-service
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up your environment variables:**
   Create a `.env` file in the root directory and add your database and RabbitMQ configurations.

   ```env
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   RABBITMQ_URL=amqp://localhost
   ```

4. **Run database migrations:**

   ```sh
   npx sequelize-cli db:migrate
   ```

5. **Start the service:**
   ```sh
   npm start
   ```

## Usage

Once the service is running, you can interact with the API at `http://localhost:3000`. Use tools like Postman or cURL to test the endpoints.

## API Endpoints

### Create Order

- **URL:** `/orders`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "productId": ["123", "456"],
    "userId": "789",
    "quantity": [2, 1],
    "price": [29.99, 59.99]
  }
  ```
- **Request Body:**
  ```json
  {
    "id": 1,
    "userId": "789",
    "email": "user@example.com",
    "productName": ["Product1", "Product2"],
    "totalAmount": 119.97,
    "createdAt": "2024-05-21T14:09:55.418Z",
    "updatedAt": "2024-05-21T14:09:55.418Z"
  }
  ```

### Create Order

- **URL:** `/orders`
- **Method:** `GET`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "userId": "789",
      "email": "user@example.com",
      "productName": ["Product1", "Product2"],
      "totalAmount": 119.97,
      "createdAt": "2024-05-21T14:09:55.418Z",
      "updatedAt": "2024-05-21T14:09:55.418Z"
    }
  ]
  ```

## Related Projects

- [Backend Service](https://github.com/batuncer/Ecommercial-Backend)
- [Frontend Service](https://github.com/batuncer/Ecommercial-Frontend)
