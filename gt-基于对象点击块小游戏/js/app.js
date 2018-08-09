    var box = new Box( container );
    box.random( container );
    var timer = setInterval( function () {
        box.random( container );
    }, 2000);
    container.onclick = function ( e ) {
        if ( e.target.className === '_div' ) {
            alert( '1' );
            clearInterval( timer );
        }
    }
