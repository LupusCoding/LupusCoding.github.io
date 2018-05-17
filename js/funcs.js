/* JSON source file */
var filepath = 'json/resources.json';
/* @var object repository list from JSON file */
var repositories = null;
/* @var object document list from JSON file */
var documents = null;
/* @var object image list from JSON file*/
var images = null;

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
        images       = response.images;
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
            a.target = "_blank";
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
        if(repositories[r].url != '') {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = repositories[r].url;
            a.innerHTML = repositories[r].name + '<br/><em><small>' + repositories[r].description + '</small></em>';
            a.target = "_blank";
            li.append(a);
            repoList.append(li);
        }
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
    listend = documents.length-1;
    for(var d=listend; d>listend-steps; d--) {
        if(d < 0) {
            break;
        }
        if(documents[d].url == '') {
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
        if(documents[d].url != '') {
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

function getImageGalleries(steps) {
    var imgList = document.getElementById('img_list');
    imgList.children[0].remove();
    listend = images.length-1;
    if(steps == 0) {
        steps = listend;
    }
    for(var i=listend; i>listend-steps; i--) {
        if(i < 0) {
            break;
        }
        if(images[i].folder == '') {
            steps++;
        } else {
            var container = document.createElement('div');
            container.classList.add('gallery-prev');
            var img = document.createElement('img');
            img.src = '/images/'+images[i].folder+'/0001.'+images[i].suffix;
            img.style.height = '100px';
            img.style.margin = '0 auto';
            img.style.display = 'block';
            var span = document.createElement('span');
            span.style.display = 'block';
            span.style.textAlign = 'center';
            span.innerHTML = images[i].name;
            var a = document.createElement('a');
            a.setAttribute('gid',i);
            a.append(img);
            a.append(span);
            container.append(a);
            imgList.append(container);
        }
    }
}

function getImagesFromGallery(galleryId) {
    if(galleryId == null || galleryId != parseInt(galleryId, 10)) {
        return false;
    }
    var imagesHtml = [];
    for(var gi=1; gi<=images[galleryId].last; gi++) {
        var container = document.createElement('div');
        container.classList.add('gallery-img');
        var img = document.createElement('img');
        img.src = '/images/'+images[galleryId].folder+'/'+padNum(gi)+'.'+images[galleryId].suffix;
        img.classList.add('prev-img');
        container.append(img);
        imagesHtml.push(container);
    }
    return imagesHtml;
}

function loadGallery(galleryId) {
    if(galleryId == null || galleryId != parseInt(galleryId, 10)) {
        return false;
    }
    var galleryContainer = document.getElementById('gallery-container');
    var gallerTitle      = document.getElementById('gallery-title');
    var galleryContent   = document.getElementById('gallery-content');
    var loader = document.getElementsByClassName('loader-bg')[0];
    galleryContainer.style.display = 'none';
    gallerTitle.innerHTML = '';

    loader.style.display = 'block';

    if(galleryContent.children.length > 0) {
        var galleryChildren = galleryContent.children;
        for(var ic=galleryChildren.length-1; ic>=0; ic--) {
            galleryContent.children[ic].remove();
        }
    }

    var imagesHtml = getImagesFromGallery(galleryId);
    if(imagesHtml.length > 0) {
        for (img in imagesHtml) {
            imagesHtml[img].getElementsByTagName('img')[0].addEventListener('click', function () { showImage(this.getAttribute('src')); } );
            galleryContent.append(imagesHtml[img]);
        }
        gallerTitle.innerHTML = images[galleryId].name;
        galleryContainer.style.display = 'block';
    }
    loader.style.display = 'none';
}

function showImage(imgsrc) {
    if(imgsrc == null) {
        return false;
    }
    var overlayBG = document.getElementsByClassName('overlay')[0];
    var overlayC = document.getElementById('overlay_content');
    var loader = document.getElementsByClassName('loader-bg')[0];
    loader.style.display = 'block';

    var image = document.createElement('img');
    image.setAttribute('src', imgsrc);
    image.classList.add('img-big');
    overlayC.append(image);

    overlayBG.style.display = 'block';
    document.getElementsByTagName('body')[0].classList.add('overlay-open');
    loader.style.display = 'none';
}

function padNum(num) {
    var str = "" + num;
    var pad = "0000";
    return pad.substring(0, pad.length - str.length) + str;
}

function closeOverlay() {
    var overlayBG = document.getElementsByClassName('overlay')[0];
    var content = document.getElementById('overlay_content').children;
    childlength = content.length-1;
    for(var c=childlength; c>=0; c--) {
        content[c].remove();
    }
    document.getElementsByTagName('body')[0].classList.remove('overlay-open');
    overlayBG.style.display = 'none';
}
