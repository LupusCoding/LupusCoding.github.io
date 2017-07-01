
function getLists() {
    setTimeout(function() {
        if(documents != null && repositories != null) {
            fillRepoPrev(4);
            fillDocPrev(4);
            getImageGalleries(4);
            modGalleryList();
        } else {
            getLists();
        }
    },500);
}

function modGalleryList() {
    setTimeout(function() {
        if(typeof document.getElementById('img_list').getElementsByClassName('gallery-prev') != 'undefined' &&
            typeof document.getElementById('img_list').getElementsByClassName('gallery-prev')[0].getElementsByTagName('a') != 'undefined') {
            var galleryList   = document.getElementById('img_list').getElementsByClassName('gallery-prev')[0].getElementsByTagName('a');
            for(var i=0; i<galleryList.length; i++) {
                galleryList[i].href = '/gallery.html?st='+galleryList[i].getAttribute('gid');
                console.log(galleryList[i]);
            }
        } else {
            modGalleryList();
        }
    },500);
}

// we take the resources first, so we can use them at DOMContentLoaded state
getResources();
document.addEventListener('DOMContentLoaded', function() {
    getLists();

    // var overlay = document.getElementsByClassName('overlay-bg')[0];
    // overlay.addEventListener('click', function() { closeOverlay(); } );
});