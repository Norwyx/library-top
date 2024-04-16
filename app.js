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

const getBookFromInput = () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead = document.getElementById('isRead').checked
    return new Book (title, author, pages, isRead)
}

const addBook = (e) => {
    e.preventDefault()
    const newBook = getBookFromInput()
    library.addBook(newBook)
    closeModal()
    // console.log(library.books.entries())
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