let books = [
  { author: "J.D. Salinger", title: "The Catcher in the Rye", id: 1 },
  { author: "Harper Lee", title: "To Kill a Mockingbird", id: 2 },
  { author: "George Orwell", title: "1984", id: 3 },
  { author: "F. Scott Fitzgerald", title: "The Great Gatsby", id: 4 },
  { author: "Jane Austen", title: "Pride and Prejudice", id: 5 },
  {
    author: "J.K. Rowling",
    title: "Harry Potter and the Philosopher's Stone",
    id: 6,
  },
  { author: "J.R.R. Tolkien", title: "The Hobbit", id: 7 },
  { author: "George Orwell", title: "The Lord of the Rings", id: 8 },
  { author: "Aldous Huxley", title: "Animal Farm", id: 9 },
  { author: "Aldous Huxley", title: "Brave New World", id: 10 },
];

class patron {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
}

class bookStatus {
  constructor(patron = null, checkOut = false) {
    this.patron = patron;
    this.checkOut = checkOut;
  }
}
// Create a Book class with properties title, author, id, and status, where status is an instance of BookStatus.
class book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
    this.status = new bookStatus();
  }
}

class library {
  constructor(name, books) {
    this.name = name;
    this.books = books;
  }
  addBook(title, auther, id) {
    const newBook = new book(title, auther, id);
    this.books.push(newBook);
  }
  removeBook(id) {
    this.books = this.books.filter((elemnt) => {
      return elemnt.id !== id;
    });
    return this.books;
  }
  getBookById(id) {
    const elementById = this.books.find((elemnt) => {
      return elemnt.id === id;
    });
    if (elementById === undefined) {
      console.log("the book is not available");
    } else {
      return elementById;
    }
  }
  checkOutBook(id, patron) {
    let borrowRequest = this.getBookById(id);
    if (borrowRequest === undefined) {
      return;
    }
    if (borrowRequest.status === undefined) {
      borrowRequest.status = new bookStatus(patron, true);
      return;
    }
    if (borrowRequest.status.checkOut === true) {
      console.log("this book is checked out right now");
      return;
    }
    borrowRequest.status.checkOut = true;
    borrowRequest.status.patron = patron;
  }

  checkInBook(id) {
    let returnRequest = this.getBookById(id);
    returnRequest.status = new bookStatus();
  }
}

const Library = new library("Central Library", books);

// Adding new books
Library.addBook("The Alchemist", "Paulo Coelho", 11);
Library.addBook("The Da Vinci Code", "Dan Brown", 12);

// Removing a book
Library.removeBook(5);

// Creating a new patron
const Patron = new patron("John Smith", 1);

// Checking out a book for the patron
Library.checkOutBook(3, Patron);

// Logging the book checked out by the patron
const CheckedOutBook = Library.getBookById(3);
console.log(
  `bookTitle: ${CheckedOutBook.title}, checkedOutBy: ${CheckedOutBook.status.patron.name}`
);

// Checking the book back in
Library.checkInBook(3);

// Logging the book checked in by the patron
const CheckedInBook = Library.getBookById(3);
console.log(
  `bookTitle: ${CheckedInBook.title}, checkedOut: ${CheckedInBook.status.checkOut}`
);
