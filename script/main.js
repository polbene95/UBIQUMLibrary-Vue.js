let app = new Vue({

    el: "#app",
    data: {
        books: [],
        allBooks: [],
        warningText: false,
        flipDisplay: true,
        noData: true,
    },
    created: function () {
        this.getData();
    },
    methods: {
        getData: function () {
            fetch("https://api.myjson.com/bins/12vg0m")
                .then(response => response.json())
                .then(json => {
                    app.books = json.books;
                    app.allBooks = json.books;
                    app.warningText = true;
                    app.noData = false;
                    app.searchBar();
                })
                .catch(error => console.log(error))
        },
        searchBook: function () {
            this.books = [];
            const books = this.allBooks;
            const input = document.getElementById("search-bar");
            const value = input.value;
            for (let i = 0; i < books.length; i++) {
                var title = this.lowerCaseFirstLetter(books[i].title);
                if (value == title || value == "") {
                    app.books.push(books[i]);
                }
            }
            input.innerHTML = "";
        },
        lowerCaseFirstLetter: function (string) {
            return string.charAt(0).toLowerCase() + string.slice(1);
        },
        resetBooks: function () {
            this.books = this.allBooks;
        },
        changeDisplay: function () {
            if (this.flipDisplay == true) {
                this.flipDisplay = false;
            } else {
                this.flipDisplay = true;
            }
        },
        searchBar: function () {
            var allBooks = this.allBooks;
            var searchBar = document.getElementById("search-bar");
            searchBar.addEventListener("keyup", function (e) {
                var filteredBooks = []
                var term = e.target.value.toLowerCase();
                allBooks.forEach(function (book) {
                    if (book.title.toLocaleLowerCase().indexOf(term) != -1) {
                        filteredBooks.push(book);
                    }
                })
                app.books = filteredBooks;
            })
        }
    }
})



