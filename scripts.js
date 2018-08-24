var Image = function(filename) {
    this.filename = filename;
    this.imageClickTotal = 0;
}

var images = [];
images.push(new Image('bag.jpg'));
images.push(new Image('banana.jpg'));
images.push(new Image('boots.jpg'));
images.push(new Image('chair.jpg'));
images.push(new Image('cthulhu.jpg'));
images.push(new Image('dragon.jpg'));
images.push(new Image('pen.jpg'));
images.push(new Image('scissors.jpg'));
images.push(new Image('shark.jpg'));
images.push(new Image('sweep.jpg'));
images.push(new Image('unicorn.jpg'));
images.push(new Image('usb.jpg'));
images.push(new Image('water_can.jpg'));
images.push(new Image('wine_glass.jpg'));

var imagesContainer = document.getElementById('imagesContainer');
var gameTitle = document.getElementsByTagName('h2')[0];
var roundTitle = document.getElementsByTagName('h3')[0];
var instructions = document.getElementsByClassName('instructions')[0];
var clicks = 0;

function generate3Images() {
    gameTitle.innerText = 'Please select 1 of the images below';
    var buttonContainer = document.getElementsByClassName('button')[0];
    roundTitle.innerText = 'This is round number ' + clicks;
    buttonContainer.innerHTML = ' ';
    instructions.innerHTML = ' ';
    if(clicks < 3) {
    var leftImage = Math.floor(Math.random()*images.length);
    var centerImage = Math.floor(Math.random()*images.length);
    var rightImage = Math.floor(Math.random()*images.length);
    
    imagesContainer.innerHTML = ' ';
    
    while(leftImage == centerImage || leftImage == rightImage || centerImage == rightImage) {
        centerImage = Math.floor(Math.random()*images.length);
        rightImage = Math.floor(Math.random()*images.length);
    }
    
    var createImage = document.createElement('img');
    createImage.setAttribute('src', 'images/' + images[leftImage].filename);
    imagesContainer.appendChild(createImage);
    createImage = document.createElement('img');
    createImage.setAttribute('src', 'images/' + images[centerImage].filename);
    imagesContainer.appendChild(createImage);
    createImage = document.createElement('img');
    createImage.setAttribute('src', 'images/' + images[rightImage].filename);
    imagesContainer.appendChild(createImage);
    
    } else {
        showResults();
    }
}


function imageClickCounter(e) {
    clicks++;
    var target = e.target.src;
    var splitTarget = target.split('/');
    var targetSrc = splitTarget[splitTarget.length - 1];
    console.log(targetSrc);
    
    for(var imageIndex = 0; imageIndex < images.length; imageIndex++){
        if(images[imageIndex].filename == targetSrc){
            images[imageIndex].imageClickTotal += 1;
        } 
    }
}

function showResults() {
    gameTitle.innerText = 'Results';
    roundTitle.innerText = ' ';
    imagesContainer.innerHTML = ' ';
    var results = document.getElementById('results');
    var list = document.createElement('ul');
    results.appendChild(list);
    
    var listItem, createImage, clickResults;

    for(var imageIndex = 0; imageIndex < images.length; imageIndex++){
        listItem = document.createElement('li');
        createImage = document.createElement('img');
        createImage.setAttribute('src', 'images/' + images[imageIndex].filename);
        clickResults = document.createElement('span');
        clickResults.innerHTML = images[imageIndex].imageClickTotal;
        listItem.appendChild(clickResults);
        listItem.appendChild(createImage);
        list.appendChild(listItem);
    }
}

function progressBar() {
    var firstDash = document.getElementsByClassName('empty')[0];
    firstDash.removeAttribute('class', 'empty');
    firstDash.setAttribute('class', 'full');
}

document.getElementById('startGame').addEventListener("click", generate3Images);
imagesContainer.addEventListener("click", imageClickCounter);
imagesContainer.addEventListener("click", generate3Images);
imagesContainer.addEventListener("click", progressBar);

