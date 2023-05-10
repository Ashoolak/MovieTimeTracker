$(document).ready(function() {
    $('#search-btn').click(function() {
        var searchTerm = $('#search').val();
        $.ajax({
            method: 'GET',
            url: 'http://www.omdbapi.com/?apikey=7ed5d7c8&s=' + searchTerm,
            success: function(data) {
                $('#result').empty();
                $.each(data.Search, function(i, movie) {
                    $('#result').append('<div class="movie" data-id="' + movie.imdbID + '"><img src="' + movie.Poster + '" alt="Movie Poster"><h3>' + movie.Title + '</h3><p>' + movie.Year + '</p></div>');
                });
                $('#saved-movies').hide();
                $('#result').show();
            }
        });
    });

    $(document).on('click', '.movie', function() {
        var movieID = $(this).data('id');
        var watchedTime = prompt('Enter the time which you watched the movie up to (hh:mm:ss): ');
        $.ajax({
            method: 'GET',
            url: 'http://www.omdbapi.com/?apikey=7ed5d7c8&i=' + movieID,
            success: function(movie) {
                $('#saved-movies').append('<div class="saved-movie"><h2>' + movie.Title + '</h2><img src="' + movie.Poster + '"><p>Stoped at: ' + watchedTime + '</p><button class="remove-btn">Remove</button></div>');
                $('#result').hide();
                $('#saved-movies').show();
            }
        });
    });

    $(document).on('click', '.remove-btn', function() {
        $(this).closest('.saved-movie').remove();
    });
});
