function getLists() {
    setTimeout(function() {
        if(documents != null && repositories != null) {
            fillRepoList();
            fillDocList();
        } else {
            getLists();
        }
    },1000);
}

// we take the resources first, so we can use them at DOMContentLoaded state
getResources();
document.addEventListener('DOMContentLoaded', function() {
    getLists();
});