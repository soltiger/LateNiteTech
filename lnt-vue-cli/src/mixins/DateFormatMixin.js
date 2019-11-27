export default {
    methods: {
        formatDate: function( blogPost ) {
            return blogPost.year + "-" + this.twoDigits( blogPost.month ) + "-" + this.twoDigits( blogPost.day );
          },
        twoDigits: function( number ) {
            return number.toString().padStart(2,'0');
        }
    }
}