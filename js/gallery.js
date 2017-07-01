function getLists() {
    setTimeout(function() {
        if(documents != null) {
            getImageGalleries(0);
    		var galleryList   = document.getElementById('img_list').children;
    		var galleryFullWidth = 0;
    		for(var i=0; i<galleryList.length; i++) {
    			galleryList[i].getElementsByTagName('a')[0].addEventListener('click', 
    				function(i) { 
	    				loadGallery(this.getAttribute('gid')); 
	    			} 
    			);
    			galleryFullWidth += galleryList[i].offsetWidth;
    		}
    		// console.log(galleryFullWidth);
    		var galleryContainer = document.getElementById('img_list');
    		if(galleryFullWidth > galleryContainer.offsetWidth) {
    			galleryContainer.parent.style.overflow = 'hidden';
    			galleryContainer.parent.style.overflow = 'hidden';
    			galleryContainer.style.width = galleryFullWidth;
    		}
        } else {
            getLists();
        }
    },500);
}

// we take the resources first, so we can use them at DOMContentLoaded state
getResources();
document.addEventListener('DOMContentLoaded', function() {
    getLists();

    document.getElementsByClassName('overlay-bg')[0].addEventListener('click', function() { closeOverlay(); } );
    document.getElementById('overlay_close').addEventListener('click', function() { closeOverlay(); } );
});