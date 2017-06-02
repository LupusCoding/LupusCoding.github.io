
var filepath = 'json/resources.json';
var documents = null;

/**
 * loading JSON file
 * usage:
 * loadJSON(
 *   function(response) {
 *     // do something with it
 *   }, 'my_data.json'
 * )
 *
 */
function loadJSON(callback, url) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // you will get the parsed JSON object to work with
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);
}

function getResources() {
    loadJSON(function(response) {
        documents    = response.docs;
    }, filepath);
}

function fillDocList() {
    var docList = document.getElementById('doc_list');
    docList.children[0].remove();
    for(var d=0; d<documents.length-1; d++) {
        var li = document.createElement('li');
        li.classList.add('doclist-item');
        var a = document.createElement('a');
        a.href = documents[d].url;
        a.innerHTML = documents[d].name + '<br/><em><small>' + documents[d].description + '</small></em>';
        li.append(a);
        docList.append(li);
    }
}
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