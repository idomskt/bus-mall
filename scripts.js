var Image = function(filename) {
    this.filename = filename;
    this.label = filename.split('.') [0];
    this.imageClickTotal = 0;
    this.y = 0;
}

var images = [];
var votes = [];



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
var progressBar = document.getElementsByClassName('progressBar')[0];
var buttonContainer = document.getElementsByTagName('button')[0];
var clicks = 0;


function generate3Images() {
    gameTitle.innerText = 'Please select 1 of the images below';
    roundTitle.innerText = 'This is round number ' + clicks;
    buttonContainer.innerHTML = ' ';
    instructions.innerHTML = ' ';
    progressBar.removeAttribute('class', 'hide');
    progressBar.setAttribute('class', 'progressBar');

    if(clicks < 16) {
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
        createImage.setAttribute('class', 'image');
        imagesContainer.appendChild(createImage);
        createImage = document.createElement('img');
        createImage.setAttribute('src', 'images/' + images[centerImage].filename);
        createImage.setAttribute('class', 'image');
        imagesContainer.appendChild(createImage);
        createImage = document.createElement('img');
        createImage.setAttribute('src', 'images/' + images[rightImage].filename);
        createImage.setAttribute('class', 'image');
        imagesContainer.appendChild(createImage);
    
    } else {
        gameTitle.innerText = 'Results';
        roundTitle.innerText = ' ';
        progressBar.setAttribute('class', 'hide');
        imagesContainer.innerHTML = ' ';
        showResults();
    }
}


function imageClickCounter(e) {
    var target = e.target;
    if(target.classList.contains('image')){
        clicks++;
    }
    var targetSource = target.src;
    var splitTarget = targetSource.split('/');
    var targetSrc = splitTarget[splitTarget.length - 1];
    console.log(targetSrc);
    var firstDash = document.getElementsByClassName('empty')[0];
    firstDash.removeAttribute('class', 'empty');
    firstDash.setAttribute('class', 'full');
    
    for(var imageIndex = 0; imageIndex < images.length; imageIndex++){
        if(images[imageIndex].filename == targetSrc){
            images[imageIndex].imageClickTotal += 1;
            images[imageIndex].y++;
        } 
        chart.render();
    }
}
loadChart();

function showResults() {
    var results = document.getElementById('results');
    var list = document.createElement('ul');
    results.appendChild(list);
    
    var listItem, createImage, clickResults;
    var imagesCopy = images;

    for(var imageIndex = 0; imageIndex < images.length; imageIndex++){
        votes.push(images[imageIndex].y);
    }
    votes.sort(function(a, b) {
        return b - a;
    });

      for(var votesIndex = 0; votesIndex < votes.length; votesIndex++) {
        for(var imageIndex = 0; imageIndex < imagesCopy.length; imageIndex++){
            if(votes[votesIndex] == imagesCopy[imageIndex].y){
                listItem = document.createElement('li');
                createImage = document.createElement('img');
                createImage.setAttribute('src', 'images/' + imagesCopy[imageIndex].filename);
                clickResults = document.createElement('span');
                clickResults.innerHTML = votes[votesIndex];
                listItem.appendChild(clickResults);
                listItem.appendChild(createImage);
                list.appendChild(listItem);
                imagesCopy.splice(imageIndex, 1);
            }
        }
    }
    
}

function funcName(e) {
    var target = e.target;
    if(target.classList.contains('image')){
        generate3Images();
    }
    console.log(target);
}



imagesContainer.addEventListener("click", imageClickCounter);
document.getElementById('startGame').addEventListener("click", generate3Images);
imagesContainer.addEventListener("click", funcName);
