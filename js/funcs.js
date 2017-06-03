var filepath = 'json/resources.json';
var repositories = null;
var documents = null;
var images;

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
        repositories = response.repos;
        documents    = response.docs;
    }, filepath);
}

function fillRepoList() {
    var repoList = document.getElementById('repo_list');
    repoList.children[0].remove();
    for(var r=0; r<repositories.length-1; r++) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = repositories[r].url;
        a.innerHTML = repositories[r].name + '<br/><em><small>' + repositories[r].description + '</small></em>';
        li.append(a);
        repoList.append(li);
    }
}

function fillDocList() {
    var docList = document.getElementById('doc_list');
    docList.children[0].remove();
    for(var d=0; d<documents.length-1; d++) {
        var li = document.createElement('li');
        li.classList.add('doclist-item');
        var a = document.createElement('a');
        a.href = documents[d].url;
        a.target = '_blank';
        a.innerHTML = documents[d].name + '<br/><em><small>' + documents[d].description + '</small></em>';
        li.append(a);
        docList.append(li);
    }
}

