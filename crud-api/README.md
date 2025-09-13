# 📚 Books API

A RESTful API for managing books built with Node.js and Express. Perfect for learning, prototyping, or building book-related applications.

## ✨ Features

- 📖 Complete CRUD operations for books
- 🔍 Search functionality by title, author, or genre
- ✅ Input validation and error handling
- 🌐 CORS enabled for frontend integration
- 🚀 Ready for deployment to various platforms
- 📝 TypeScript-compatible data structure

## 🏗️ Book Data Structure

```typescript
export type Book = {
    id: number;
    title: string;
    author: string;
    publishedDate: string;
    genres: string[];
};
```

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd books-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the server**
```bash
npm start
# or for development with auto-reload
npm run dev
```

4. **Test the API**
Visit `http://localhost:3000/api/books` in your browser or use a tool like Postman.

## 📡 API Endpoints

### Base URL
- **Local**: `http://localhost:3000`
- **Production**: `https://your-deployment-url.com`

### Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books |
| GET | `/api/books/:id` | Get a specific book |
| POST | `/api/books` | Create a new book |
| PUT | `/api/books/:id` | Update a book |
| DELETE | `/api/books/:id` | Delete a book |
| GET | `/api/books/search` | Search books |

### Detailed API Documentation

#### 📖 Get All Books
```http
GET /api/books
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "publishedDate": "1925-04-10",
      "genres": ["Classic", "Fiction", "American Literature"]
    }
  ],
  "count": 5
}
```

#### 📖 Get Single Book
```http
GET /api/books/:id
```

**Example:** `GET /api/books/1`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publishedDate": "1925-04-10",
    "genres": ["Classic", "Fiction", "American Literature"]
  }
}
```

#### ➕ Create New Book
```http
POST /api/books
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Dune",
  "author": "Frank Herbert",
  "publishedDate": "1965-08-01",
  "genres": ["Science Fiction", "Adventure"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 6,
    "title": "Dune",
    "author": "Frank Herbert",
    "publishedDate": "1965-08-01",
    "genres": ["Science Fiction", "Adventure"]
  },
  "message": "Book created successfully"
}
```

#### ✏️ Update Book
```http
PUT /api/books/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "author": "Updated Author",
  "publishedDate": "2023-01-01",
  "genres": ["Updated Genre"]
}
```

#### 🗑️ Delete Book
```http
DELETE /api/books/:id
```

**Example:** `DELETE /api/books/1`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publishedDate": "1925-04-10",
    "genres": ["Classic", "Fiction", "American Literature"]
  },
  "message": "Book deleted successfully"
}
```

#### 🔍 Search Books
```http
GET /api/books/search?q=gatsby
GET /api/books/search?author=orwell
GET /api/books/search?genre=fiction
```

**Query Parameters:**
- `q` - Search in title and author
- `author` - Filter by author name
- `genre` - Filter by genre

**Example:** `GET /api/books/search?q=gatsby`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "publishedDate": "1925-04-10",
      "genres": ["Classic", "Fiction", "American Literature"]
    }
  ],
  "count": 1
}
```

## 🧪 Testing with curl

```bash
# Get all books
curl https://your-api-url.com/api/books

# Get a specific book
curl https://your-api-url.com/api/books/1

# Create a new book
curl -X POST https://your-api-url.com/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Book",
    "author": "Test Author",
    "publishedDate": "2023-01-01",
    "genres": ["Test Genre"]
  }'

# Search books
curl "https://your-api-url.com/api/books/search?q=gatsby"
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Your API is live!** 🎉
Visit the provided URL to access your API.

### Deploy to Other Platforms

- **Railway**: Connect GitHub repo at [railway.app](https://railway.app)
- **Render**: Connect GitHub repo at [render.com](https://render.com)
- **Glitch**: Import from GitHub at [glitch.com](https://glitch.com)

## 📁 Project Structure

```
books-api/
├── api/
│   └── books.js          # Serverless function (Vercel)
├── server.js             # Express server (traditional hosting)
├── package.json
├── README.md
└── .gitignore
```

## 🛠️ Development

### Available Scripts

```bash
npm start        # Start production server
npm run dev      # Start development server with auto-reload
npm run deploy   # Deploy to Vercel
```

### Sample Data

The API comes with 5 sample books:
- The Great Gatsby by F. Scott Fitzgerald
- To Kill a Mockingbird by Harper Lee
- 1984 by George Orwell
- Pride and Prejudice by Jane Austen
- The Catcher in the Rye by J.D. Salinger

## 🔄 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description here"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔮 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication and authorization
- [ ] Pagination for large datasets
- [ ] Rate limiting
- [ ] API documentation with Swagger
- [ ] Unit and integration tests
- [ ] Book cover image support
- [ ] Advanced filtering and sorting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you have any questions or run into issues, please [open an issue](https://github.com/your-username/books-api/issues) on GitHub.

---

**Happy coding!** 🚀📚