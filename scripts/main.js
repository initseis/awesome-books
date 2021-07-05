let books = [];

function book(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
}

const mainForm = document.getElementById("main-form");
const submitButton = document.getElementById("submit-button");
const bookTitle = document.getElementById("book-title");
const bookAuthor = document.getElementById("book-author");
const bookList = document.querySelector('.book-list');


submitButton.addEventListener('click', addBook);

function addBook(){
    const newBook = new book(books.length+1, bookTitle.value, bookAuthor.value);
    books.push(newBook);
    const bookLi = document.createElement('li');
    bookLi.id = `book-${newBook.id}`;
    bookList.appendChild(bookLi);
    const bookTitleP = document.createElement('p');
    bookTitleP.innerHTML= newBook.title;
    bookLi.appendChild(bookTitleP);

    const bookAuthorP = document.createElement('p');
    bookAuthorP.innerHTML= newBook.author;
    bookLi.appendChild(bookAuthorP);
    
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-button';
    removeButton.innerHTML = "Remove";
    removeButton.id = books.length;
    bookLi.appendChild(removeButton);

    const hrLi = document.createElement('hr');
    bookLi.appendChild(hrLi);
    
    removeButton.addEventListener('click', removeBook);
   
    // console.log(bookTitle.value);
    console.log(books);
}

// for (let i = 0; i < rmvButtons.length; i++) {
//   rmvButtons[i].addEventListener('click', removeBook);
//   console.log("45")
// }

function removeBook(){
  // bookList.removeChild(book);
  bookList.removeChild(document.getElementById(`book-${this.id}`));
  // alert(this.id);
}