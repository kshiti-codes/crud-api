import { books } from './booksData';

// Helper functions
const findBookById = (id) => books.find(book => book.id === parseInt(id));
const getNextId = () => Math.max(...books.map(book => book.id), 0) + 1;

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours   
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { method, query } = req;
    const { id } = query;

    switch (method) {
        case 'GET':
            if (id) {
                // Get specific book
                const book = findBookById(id);
                if (!book) {
                    return res.status(404).json({
                        success: false,
                        message: 'Book not found'
                    });
                }
                return res.json({
                    success: true,
                    data: book
                });
            } else {
                // Get all books or search
                const { q, author, genre } = query;
                let filteredBooks = books;
                
                if (q) {
                    filteredBooks = filteredBooks.filter(book => 
                        book.title.toLowerCase().includes(q.toLowerCase()) ||
                        book.author.toLowerCase().includes(q.toLowerCase())
                    );
                }
                
                if (author) {
                    filteredBooks = filteredBooks.filter(book => 
                        book.author.toLowerCase().includes(author.toLowerCase())
                    );
                }
                
                if (genre) {
                    filteredBooks = filteredBooks.filter(book => 
                        book.genres.some(g => g.toLowerCase().includes(genre.toLowerCase()))
                    );
                }
                
                return res.json({
                    success: true,
                    data: filteredBooks,
                    count: filteredBooks.length
                });
            }

        case 'POST':
            const { title, author, publishedDate, genres } = req.body;
            
            // Validation
            if (!title || !author || !publishedDate || !genres) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields: title, author, publishedDate, genres'
                });
            }
            
            if (!Array.isArray(genres)) {
                return res.status(400).json({
                    success: false,
                    message: 'Genres must be an array'
                });
            }
            
            const newBook = {
                id: getNextId(),
                title,
                author,
                publishedDate,
                genres
            };
            
            books.push(newBook);
            
            return res.status(201).json({
                success: true,
                data: newBook,
                message: 'Book created successfully'
            });

        case 'PUT':
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Book ID is required'
                });
            }
            
            const bookIndex = books.findIndex(book => book.id === parseInt(id));
            
            if (bookIndex === -1) {
                return res.status(404).json({
                    success: false,
                    message: 'Book not found'
                });
            }
            
            const { title: newTitle, author: newAuthor, publishedDate: newDate, genres: newGenres } = req.body;
            
            if (!newTitle || !newAuthor || !newDate || !newGenres) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields'
                });
            }
            
            books[bookIndex] = {
                id: parseInt(id),
                title: newTitle,
                author: newAuthor,
                publishedDate: newDate,
                genres: newGenres
            };
            
            return res.json({
                success: true,
                data: books[bookIndex],
                message: 'Book updated successfully'
            });

        case 'DELETE':
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Book ID is required'
                });
            }
            
            const deleteIndex = books.findIndex(book => book.id === parseInt(id));
            
            if (deleteIndex === -1) {
                return res.status(404).json({
                    success: false,
                    message: 'Book not found'
                });
            }
            
            const deletedBook = books.splice(deleteIndex, 1)[0];
            
            return res.json({
                success: true,
                data: deletedBook,
                message: 'Book deleted successfully'
            });

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            return res.status(405).json({
                success: false,
                message: `Method ${method} not allowed`
            });
    }
}