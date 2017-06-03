function getLists() {
    setTimeout(function() {
        if(documents != null) {
            fillDocList();
        } else {
            getLists();
        }
    },500);
}

// we take the resources first, so we can use them at DOMContentLoaded state
getResources();
document.addEventListener('DOMContentLoaded', function() {
    getLists();
});