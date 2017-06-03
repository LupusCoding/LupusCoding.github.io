/* JSON source file */
var filepath = 'json/resources.json';
/* @var object repository list from JSON file */
var repositories = null;
/* @var object document list from JSON file */
var documents = null;
/* @var object image list from JSON file*/
var images;

/**
 * loading JSON file
 *
 * @param function  callback function
 * @param string    url to load
 *
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

/**
 * get resources from JSON file and set
 * the values to the vars
 *
 */
function getResources() {
    loadJSON(function(response) {
        repositories = response.repos;
        documents    = response.docs;
    }, filepath);
}

/**
 * fill repository ul-Element with li-elements
 * from last to nth-element, given by [steps] param
 *
 * @param int steps     count of elements to show
 *
 */
function fillRepoPrev(steps) {
    var repoList = document.getElementById('repo_list');
    repoList.children[0].remove();
    listend = repositories.length-1;
    for(var r=listend; r>listend-steps; r--) {
        if(r < 0) {
            break;
        }
        if(repositories[r].url == '') {
            steps++;
        } else {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = repositories[r].url;
            a.innerHTML = repositories[r].name + '<br/><em><small>' + repositories[r].description + '</small></em>';
            li.append(a);
            repoList.append(li);
        }
    }
}

/**
 * fill repository ul-Element with li-elements
 * from first to last element
 *
 */
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

/**
 * fill repository ul-Element with li-elements
 * from last to nth-element, given by [steps] param
 *
 * @param int steps     count of elements to show
 *
 */
function fillDocPrev(steps) {
    var docList = document.getElementById('doc_list');
    docList.children[0].remove();
    listend = repositories.length-1;
    for(var d=listend; d>listend-steps; d--) {
        if(d < 0) {
            break;
        }
        if(repositories[d].url == '') {
            steps++;
        } else {
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
}

/**
 * fill documents ul-Element with li-elements
 * from first to last element
 *
 */
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

