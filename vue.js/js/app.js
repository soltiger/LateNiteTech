// Main app
new Vue({
    el: '#mainContainer',
    data: {
        appState: {
            authenticated: false,
            pageMode: false
        },
        selectedBlogPost: {
            id: 0,
            date: "",
            topic: "",
            content: ""
        },
        blogPosts: [
            { id: 1, year: 2019, month:6, day:4, topic: "Hello World 4", content: "", draft: false },
            { id: 2, year: 2019, month:4, day:4, topic: "Hello World 3", content: "", draft: false },
            { id: 3, year: 2018, month:4, day:12, topic: "Hello World 2", content: "", draft: false },
            { id: 4, year: 2017, month:2, day:2, topic: "Hello World 1", content: "", draft: false },
            { id: 5, year: 2018, month:1, day:3, topic: "Hello World 7", content: "", draft: true },
            { id: 6, year: 2016, month:2, day:2, topic: "Hello World 6", content: "", draft: true },
            { id: 7, year: 2019, month:3, day:1, topic: "Hello World 5", content: "", draft: true },
        ]
    },
    created: function() {
        this.sortPosts();
        this.selectedBlogPost = this.blogPosts[ 0 ];
        this.appState.pageMode = "display";
    },
    computed: {
        compiledMarkdown: function () {
            return marked( this.selectedBlogPost.content, { sanitize: true } );
        }
    },
    methods: {
        sortPosts: function() {
            this.blogPosts = this.blogPosts.sort( (a,b) => new Date( b.year, b.month-1, b.day ) - new Date( a.year, a.month-1, a.day ) );
        },
        login: function() {
            this.appState.authenticated = true;
        },
        logout: function() {
            this.appState.authenticated = false;
        },
        edit: function() {
            this.appState.pageMode = "edit";
        },
        display: function( id ) {
            if( id ) {
                this.selectedBlogPost = this.getPost( id );
            }

            this.appState.pageMode = "display";
        },
        deletePost: function( id ) {
            this.blogPosts = this.blogPosts.filter( post => post.id != id );
            this.selectedBlogPost = this.blogPosts[0];
            this.appState.pageMode = "display";
        },
        newPost: function() {
            var today = new Date();

            this.selectedBlogPost = { 
                id: 0, 
                year: today.getFullYear(),
                month: (today.getMonth()+1),
                day: today.getDate(),
                topic: "New Post",
                content: ""
            };

            this.appState.pageMode = "edit";
        },
        save: function() {
            if( this.selectedBlogPost.id == 0 ) {
                this.selectedBlogPost.id = this.findNextID();
                this.blogPosts.push( this.selectedBlogPost );
                this.sortPosts();
            }
            this.appState.pageMode = "display";
        },
        publish: function() {
            this.selectedBlogPost.draft = false;
            this.save();
        },
        discard: function() {
            this.appState.pageMode = "display";
        },
        updateEditor: _.debounce( function ( e ) {
            this.selectedBlogPost.content = e.target.value
            }, 300),
        updateTopic: _.debounce( function ( e ) {
            this.selectedBlogPost.topic = e.target.value
            }, 300),
        findNextID: function( ) {
            let biggest = -1;
            this.blogPosts.forEach( function( post ) { if( post.id > biggest ) biggest = post.id; } );
            return biggest + 1;
        },
        getPostsByYears: function( drafts = false) {
            postYears = [];
            let years = this.getYears( drafts );
            let self = this;

            years.forEach( function(y) {
                let posts = self.getPosts( y, drafts );

                postYears.push( {
                    year: y,
                    posts: posts,
                    count: posts.length
                });
            } );

            return postYears;
        },
        getYears: function( drafts = false ) {
            // Get years only
            let years = [];
            const posts = this.blogPosts.filter( post => post.draft == drafts );
            posts.forEach( p => { years.push( p.year ) } );
            // Return unique years
            return years.filter( ( y,i,self ) => self.indexOf( y ) == i );
        },
        getPosts: function(y, drafts = false)  {
            return this.blogPosts.filter( post => ( post.year == y && post.draft == drafts ) );
        },
        getPost: function( id )  {
            return this.blogPosts.filter( post => post.id == id )[0];
        },
        formatDate: function(p) {
            return p.year + "-" + this.twoDigits( p.month ) + "-" + this.twoDigits( p.day )
        },
        twoDigits: function(n) {
            return n.toString().padStart(2,'0');
        }
    }
});