
function getLists() {
    setTimeout(function() {
        if(documents != null && repositories != null) {
            fillRepoPrev(4);
            fillDocPrev(4);
            getImageGalleries(4);
        } else {
            getLists();
        }
    },500);
}

// we take the resources first, so we can use them at DOMContentLoaded state
getResources();
document.addEventListener('DOMContentLoaded', function() {
    getLists();

    var overlay = document.getElementsByClassName('overlay-bg')[0];
    overlay.addEventListener('click', function() { closeOverlay(); } );
});