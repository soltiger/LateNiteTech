export default {
    methods: {
        _formatDate: function( blogPost ) {
            return blogPost.year + "-" + this._twoDigits( blogPost.month ) + "-" + this._twoDigits( blogPost.day );
          },
        _twoDigits: function( number ) {
            return number.toString().padStart(2,'0');
        }
    }
}