# Simple Proxy Server

This is a lightweight, Node.js-based proxy server that forwards HTTP/HTTPS requests to a target server specified in the query parameters. It also supports CORS (Cross-Origin Resource Sharing) and handles preflight `OPTIONS` requests.

## Features

- **CORS Support**: Allows cross-origin requests by setting the `Access-Control-Allow-Origin` header to `*`.
- **Dynamic Target URL**: The target server URL is passed as a query parameter (`url`) in the request.
- **Error Handling**: Provides meaningful error messages for invalid URLs or server errors.
- **Preflight Requests**: Handles `OPTIONS` requests to support CORS preflight checks.
- **Customizable Port**: The server listens on a configurable port (default: `4000`).

---

## Installation

### Prerequisites
- Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Clone the Repository
```bash
git clone https://github.com/your-username/proxy-server.git
cd proxy-server
```

### Install Dependencies
This project uses only built-in Node.js modules, so no additional dependencies are required.

### Run the Server
Start the proxy server using the following command:
```bash
node index.js
```
By default, the server will run on port 4000. You can specify a different port by setting the `PORT` environment variable:
```bash
PORT=5000 node index.js
```

## Usage

### Making Requests
To forward a request through the proxy server, include the target server URL as a query parameter (`url`) in your request. 

#### Example Request
```bash
curl "http://localhost:4000/?url=https://jsonplaceholder.typicode.com/posts"
```

### Explanation
- The proxy server will forward the request to `https://jsonplaceholder.typicode.com/posts`.
- The response from the target server will be returned to the client with added CORS headers.

### Supported Methods
The proxy server supports the following HTTP methods:
- `GET`
- `POST`
- `PUT`
- `DELETE`
- `OPTIONS`

### Preflight Requests
If the client sends an `OPTIONS` request, the proxy server will respond with a `204 No Content` status and the appropriate CORS headers.

## Error Handling
The proxy server provides meaningful error responses for common issues:

- **Missing Target URL**: If the `url` query parameter is not provided, the server responds with a `400 Bad Request` status and the message: `Target server URL is required.`
- **Invalid Target URL**: If the `url` parameter is malformed, the server responds with a `400 Bad Request` status and the message: `Invalid target server URL.`
- **Proxy Server Error**: If an error occurs while forwarding the request, the server responds with a `500 Internal Server Error` status and the message: `Proxy server error.`

## Configuration

### Environment Variables
- **`PORT`**: Specifies the port on which the proxy server will listen. Default is `4000`.

```bash
PORT=8080 node index.js
```

## Contributing

Contributions are welcome! If you find a bug or want to add a new feature, feel free to open an issue or submit a pull request.

### Steps to Contribute
1. Fork the repository.
2. Create a new branch for your changes.
3. Commit your changes and push them to your fork.
4. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Author

Created by **Muhammad Abdullah**. Feel free to reach out if you have any questions or suggestions!

