const books = [
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




class Patron {
  constructor(name,id){
    this.name = name;
    this.id = id;
  }
}

class BookStatus {
  constructor(checkedOut=false , patron =null){
    this.checkedOut=checkedOut;
    this.patron = patron;
  }
}

class Book {
  
  constructor(title , author ,id, status){
    this.title=title;
    this.author=author;
    this.id=id;
    this.status = new BookStatus()
  }
}

class Library {
  constructor(name , books){
    this.name = name;
    this.books=books;
  }

  addBook(title, author, id){
    const newbook = new Book(title , author ,id);
    this.books.push(newbook);
  }

  removeBook(id){
    this.books.filter((value) => value.id !=id );
  }
  gitBookId(id){
    return this.books.find((value) => {value.id === id});
  }
  checkedOutBook(bookid , patron){
    const bookfound =this.gitBookId(bookid);
    if(!bookfound.status){
    bookfound.status = new BookStatus();
  }
   if(bookfound.status.checkedOut){
    console.log(`${bookfound.title} someone else borrowed it`);
   }
   if(!bookfound){
    console.log(`not found book id : ${bookid}`);
   }
   bookfound.status.checkedOut = true;
   bookfound.status.patron = patron;
}
  checkeInBookId(bookid){
  const bookfound =this.gitBookId(bookid);
  if(!bookfound){
   console.log("this is not found in library ");
   return;
  }
  bookfound.status.checkedOut =false;
  bookfound.status.patron =null;
  }
}



const library = new Library("Central Library", books);

// Adding new books
library.addBook("The Alchemist", "Paulo Coelho", 11);
library.addBook("The Da Vinci Code", "Dan Brown", 12);

// Removing a book
library.removeBook(5);

// Creating a new patron
const patron = new Patron("John Smith", 1);

// Checking out a book for the patron
library.checkedOutBook
(3, patron);

// Logging the book checked out by the patron
const checkedOutBook = library.gitBookId(3);
console.log(
  `bookTitle: ${checkedOutBook.title}, checkedOutBy: ${checkedOutBook.status.patron.name}`
);

// Checking the book back in
library.checkeInBookId(3);

// Logging the book checked in by the patron
const checkedInBook = library.gitBookId(3);
console.log(
  `bookTitle: ${checkedInBook.title}, checkedOut: ${checkedInBook.status.checkedOut}`
);