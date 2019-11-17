// Main app
new Vue({
    el: '#mainContainer',
    data: {
        appState: {
            authenticated: false,
            editMode: false
        },
        editStatus: {
            date: "yyyy-mm-dd",
            topic: "topic",
            content: ""
        },
        blogPosts: [
            { year: 2019, month:6, day:4, topic: "Hello World 4", content: "" },
            { year: 2019, month:4, day:4, topic: "Hello World 3", content: "" },
            { year: 2018, month:4, day:12, topic: "Hello World 2", content: "" },
            { year: 2017, month:2, day:2, topic: "Hello World 1", content: "" },
        ],
        drafts: [
            { year: 2019, month:6, day:7, topic: "Hello World 7", content: "" },
            { year: 2019, month:6, day:6, topic: "Hello World 6", content: "" },
            { year: 2019, month:6, day:5, topic: "Hello World 5", content: "" },
        ]
    },
    methods: {
        login: function() {
            this.appState.authenticated = true;
        },
        logout: function() {
            this.appState.authenticated = false;
        },
        edit: function( blogPost ) {
            if( blogPost ) {
                this.editStatus.date = this.formatDate( blogPost );
                this.editStatus.topic = blogPost.topic;
                this.editStatus.content = blogPost.content;
            }
            else {
                this.editStatus.date = "2019-11-17";
                this.editStatus.topic = "New Post";
                this.editStatus.content = "";
            }

            this.appState.editMode = true;
        },
        newPost: function() {
            this.appState.editMode = true;
        },
        save: function() {
            this.appState.editMode = false;
        },
        discard: function() {
            this.appState.editMode = false;
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
            const posts = ( drafts ? this.drafts : this.blogPosts );
            posts.forEach( p => { years.push( p.year ) } );
            // Return unique years
            return years.filter( ( y,i,self ) => self.indexOf( y ) == i );
        },
        getPosts: function(y, drafts = false)  {
            const posts = ( drafts ? this.drafts : this.blogPosts );
            return posts.filter( post => post.year == y );
        },
        formatDate: function(p) {
            return p.year + "-" + this.twoDigits( p.month ) + "-" + this.twoDigits( p.day )
        },
        twoDigits: function(n) {
            return n.toString().padStart(2,'0');
        }
    }
});