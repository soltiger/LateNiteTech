export default {
    methods: {
        _sortBlogPosts: function( blogPosts ) {
            blogPosts = blogPosts.sort( 
                ( blogPostA, blogPostB ) => new Date( blogPostB.year, blogPostB.month-1, blogPostB.day ) - new Date( blogPostA.year, blogPostA.month-1, blogPostA.day ) );
        },

        _getFirstPost: function( blogPosts ) {
            if( blogPosts.length ) {
              return blogPosts[ 0 ];
            }
            else {
              return this._getEmptyPost();
            }
        },

        _getEmptyPost: function( blogPosts ) {
            var today = new Date();
            
            return {
                id: 0, 
                year: today.getFullYear(),
                month: (today.getMonth()+1),
                day: today.getDate(),
                topic: "New Post",
                content: ""
            };
        },

        _getBlogPost: function( blogPosts, id )  {
            let bp = blogPosts.filter( blogPost => blogPost.id == id );
            if( bp.length ) {
                return bp[0];
            }
            else {
                return null;
            }
        },

        _getNextBlogPostId: function( blogPosts ) {
            let biggest = 0;
            blogPosts.forEach( function( blogPost ) { if( blogPost.id > biggest ) biggest = blogPost.id; } );
            return biggest + 1;
        },

        _getNumberOfBlogPostsByYear: function( blogPosts, year, includeDrafts = false ) {
            return this._getBlogPosts( blogPosts, year, includeDrafts ).length;
          },

        _getBlogPosts: function( blogPosts, year, includeDrafts = false )  {
            let posts = blogPosts;

            // Filter drafts out?
            if( !includeDrafts ) {
                posts = posts.filter( blogPost => !blogPost.draft );
            }
        
            return posts.filter( blogPost => ( blogPost.year == year ) );
        },

        _getBlogPostYears: function( blogPosts, includeDrafts = false ) {
            // Get years only
            let years = [];
            let posts = blogPosts;
      
            // Filter drafts out?
            if( !includeDrafts ) {
                posts = posts.filter( blogPost => !blogPost.draft );
            }
      
            posts.forEach( blogPost => { years.push( blogPost.year ) } );
      
            // Get unique years
            years = years.filter( ( year,i,self ) => self.indexOf( year ) == i );
            
            return years;
        },

        _deleteBlogPost: function( blogPosts, id ) {
            return blogPosts.filter( blogPost => blogPost.id != id );
        },

        _saveBlogPost: function( blogPosts, blogPost ) {
            if( blogPost.id ) {
                let i = blogPosts.findIndex( bp => bp.id == blogPost.id );
                blogPosts.splice( i, 1, blogPost );
            }
            else {
                blogPost.id = this._getNextBlogPostId( blogPosts );
                blogPosts.push( blogPost );       
            }
            this._sortBlogPosts( blogPosts );
            return blogPosts;
        },

    }
}