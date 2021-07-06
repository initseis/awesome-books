const books = [];
const count = 0;

class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

class Page {
  static displayBook(){
    const booksStore = Storage.loadBook();
    for (let i = 0; i < booksStore.length; i++) {
      Page.addBookToPage(booksStore[i]);
    }
  }

  static addBookToPage(newBook){
    books.push(newBook);
    const bookLi = document.createElement('li');
    bookLi.id = `book-${newBook.id}`;
    bookList.appendChild(bookLi);
    const bookTitleP = document.createElement('p');
    bookTitleP.innerHTML = newBook.title;
    bookLi.appendChild(bookTitleP);
    const bookAuthorP = document.createElement('p');
    bookAuthorP.innerHTML = newBook.author;
    bookLi.appendChild(bookAuthorP);
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-button';
    removeButton.innerHTML = 'Remove';
    removeButton.id = newBook.id;
    bookLi.appendChild(removeButton);
    const hrLi = document.createElement('hr');
    bookLi.appendChild(hrLi);
    removeButton.addEventListener('click', removeBook);
  }
  static removeBookFromPage(removeElement){
    removeElement.parentElement.remove();
  }
}

class Storage {
  static loadBook() {
    let books = [];
    if (!localStorage.myStringifyStorage) {
      books = [];
    } else{
      books = JSON.parse(localStorage.getItem('myStringifyStorage'));
    }
    return books;
  }

  static addBookToStorage(newBook) {
    const books = Storage.loadBook();
    books.push(newBook);
    localStorage.setItem('myStringifyStorage', JSON.stringify(books));
  }
}

const submitButton = document.getElementById('submit-button');
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
const bookList = document.querySelector('.book-list');

if (!localStorage.itemCount) {
  localStorage.setItem('itemCount', JSON.stringify(count));
}

function removeBook() {
  let index = 0;
  for (let i = 0; i < books.length; i += 1) {
    if (Number(books[i].id) === Number(this.id)) {
      index = i;
    }
  }
  books.splice(index, 1);
  Page.removeBookFromPage(this);
  localStorage.setItem('myStringifyStorage', JSON.stringify(books));
}

const localStorageBooks = JSON.parse(localStorage.getItem('myStringifyStorage'));
let idCount = JSON.parse(localStorage.getItem('itemCount'));


function addBook() {
  idCount += 1;
  const newBook = new Book(idCount, bookTitle.value, bookAuthor.value);
  Page.addBookToPage(newBook);
  Storage.addBookToStorage(newBook);
  bookTitle.value = '';
  bookAuthor.value = '';
}

submitButton.addEventListener('click', addBook);


// 1 Class for constructor 
// 2nd for local storage
// 3rd frontend 