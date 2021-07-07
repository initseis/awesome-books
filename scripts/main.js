const mainForm = document.getElementById('main-form');
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
const bookList = document.querySelector('.book-list');

class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

class Storage {
  static loadBook() {
    let books = [];
    if (!localStorage.myStringifyStorage) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('myStringifyStorage'));
    }
    return books;
  }

  static addBookToStorage(newBook) {
    const books = Storage.loadBook();
    books.push(newBook);
    localStorage.setItem('myStringifyStorage', JSON.stringify(books));
  }

  static removeFromStorage(removeElement) {
    const books = Storage.loadBook();
    let index = 0;
    for (let i = 0; i < books.length; i += 1) {
      if (Number(books[i].id) === Number(removeElement.id)) {
        index = i;
      }
    }
    books.splice(index, 1);
    localStorage.setItem('myStringifyStorage', JSON.stringify(books));
  }
}

class Page {
  static displayBook() {
    const booksStore = Storage.loadBook();
    for (let i = 0; i < booksStore.length; i += 1) {
      Page.addBookToPage(booksStore[i]);
    }
  }

  static addBookToPage(newBook) {
    const books = Storage.loadBook();
    books.push(newBook);
    const bookLi = document.createElement('li');
    bookLi.className = 'd-flex justify-content-between p-3';
    bookLi.id = `book-${newBook.id}`;
    bookList.appendChild(bookLi);
    const bookTitleP = document.createElement('p');
    bookTitleP.innerHTML = newBook.title + " by " + newBook.author;
    bookLi.appendChild(bookTitleP);
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-button btn btn-outline-primary';
    removeButton.innerHTML = 'Remove';
    removeButton.id = newBook.id;
    bookLi.appendChild(removeButton);
    removeButton.addEventListener('click', removeBook);
  }

  static removeBookFromPage(removeElement) {
    removeElement.parentElement.remove();
  }
}

function removeBook() {
  Page.removeBookFromPage(this);
  Storage.removeFromStorage(this);
}

class Counter {
  static getCount() {
    let cont = 0;
    if (!localStorage.itemCount) {
      localStorage.setItem('itemCount', JSON.stringify(0));
    } else {
      cont = Number(JSON.parse(localStorage.getItem('itemCount')));
    }
    return cont;
  }

  static saveCount(idCount) {
    localStorage.setItem('itemCount', JSON.stringify(idCount));
  }
}

document.addEventListener('DOMContentLoaded', Page.displayBook);

function addBook(event) {
  event.preventDefault();
  let idCount = Counter.getCount();
  idCount += 1;
  const newBook = new Book(idCount, bookTitle.value, bookAuthor.value);
  Page.addBookToPage(newBook);
  Storage.addBookToStorage(newBook);
  Counter.saveCount(idCount);
  bookTitle.value = '';
  bookAuthor.value = '';
}

mainForm.addEventListener('submit', addBook);
