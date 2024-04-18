// Logic

class Book {
    constructor (
        title = 'Unknown',
        author = 'Unknown',
        pages = 0,
        isRead = false
    ) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }
}

class Library {
    constructor () {
        this.books = new Map()
    }

    addBook (newBook) {
        if (!this.inLibrary(newBook)) {
            this.books.set(newBook.title, newBook)
        }
    }

    getBook (title) {
        return this.books.get(title)
    }

    inLibrary (newBook) {
        return this.books.has(newBook.title)
    }

    removeBook (title) {
        return this.books.delete(title);
    }
}

const library = new Library()



// UI

const addBtn = document.getElementById('add-btn')
const closeBtn = document.querySelector('.close-btn')
const addModal = document.getElementById('add-modal')
const form = document.querySelector('.form')
const overlay = document.querySelector('.overlay')
const grid = document.getElementById('books-grid')

const getBookFromInput = () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead = document.getElementById('isRead').checked
    return new Book (title, author, pages, isRead)
}

const resetBookGrid = () => {
    grid.innerHTML = ''
}

const updateBookGrid = () => {
    resetBookGrid()
    for(let [title, book] of library.books.entries()) {
        createBookCard(book)
    }
}

const createBookCard = (book) => {
    const bookCard = document.createElement('div')
    const title = document.createElement('p')
    const author = document.createElement('p')
    const pages = document.createElement('p')
    const cardButtons = document.createElement('div')
    const readBtn = document.createElement('button')
    const deleteBtn = document.createElement('button')

    bookCard.classList.add('card')
    cardButtons.classList.add('card-buttons')
    readBtn.classList.add('card-btn')
    deleteBtn.classList.add('card-btn')

    title.textContent = `"${book.title}"`
    author.textContent = book.author
    pages.textContent = `${book.pages} pages`
    readBtn.textContent = 'Test'
    deleteBtn.textContent = 'Remove'

    if (book.isRead) {
        readBtn.textContent = 'Read'
        readBtn.classList.add('green-btn')
    } else {
        readBtn.textContent = 'Not Read'
        readBtn.classList.add('red-btn')
    }

    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pages)
    bookCard.appendChild(cardButtons)
    cardButtons.appendChild(readBtn)
    cardButtons.appendChild(deleteBtn)
    grid.appendChild(bookCard)
}

const addBook = (e) => {
    e.preventDefault()
    const newBook = getBookFromInput()
    library.addBook(newBook)
    updateBookGrid()
    closeModal()
}

const toggleModal = () => {
    form.reset()
    addModal.classList.toggle('active')
    overlay.classList.toggle('active')
}

const closeModal = () => {
    addModal.classList.remove('active')
    overlay.classList.remove('active')
}

addBtn.onclick = toggleModal
closeBtn.onclick = toggleModal
overlay.onclick = closeModal
form.onsubmit = addBook