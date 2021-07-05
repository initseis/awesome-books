const books = [];
const count = 0;

function Book(id, title, author) {
  this.id = id;
  this.title = title;
  this.author = author;
}

const submitButton = document.getElementById('submit-button');
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
const bookList = document.querySelector('.book-list');

if (!localStorage.myStringifyStorage) {
  localStorage.setItem('myStringifyStorage', JSON.stringify(books));
}

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
  bookList.removeChild(document.getElementById(`book-${this.id}`));
  localStorage.setItem('myStringifyStorage', JSON.stringify(books));
}

const localStorageBooks = JSON.parse(localStorage.getItem('myStringifyStorage'));
let idCount = JSON.parse(localStorage.getItem('itemCount'));

for (let i = 0; i < localStorageBooks.length; i += 1) {
  books.push(localStorageBooks[i]);
  const bookLi = document.createElement('li');
  bookLi.id = `book-${localStorageBooks[i].id}`;
  bookList.appendChild(bookLi);
  const bookTitleP = document.createElement('p');
  bookTitleP.innerHTML = localStorageBooks[i].title;
  bookLi.appendChild(bookTitleP);
  const bookAuthorP = document.createElement('p');
  bookAuthorP.innerHTML = localStorageBooks[i].author;
  bookLi.appendChild(bookAuthorP);
  const removeButton = document.createElement('button');
  removeButton.className = 'remove-button';
  removeButton.innerHTML = 'Remove';
  removeButton.id = localStorageBooks[i].id;
  bookLi.appendChild(removeButton);
  const hrLi = document.createElement('hr');
  bookLi.appendChild(hrLi);
  removeButton.addEventListener('click', removeBook);
}

function addBook() {
  idCount += 1;
  const newBook = new Book(idCount, bookTitle.value, bookAuthor.value);
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
  localStorage.setItem('myStringifyStorage', JSON.stringify(books));
  localStorage.setItem('itemCount', JSON.stringify(idCount));
}

submitButton.addEventListener('click', addBook);
