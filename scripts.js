var Image = function(filename) {
    this.filename = filename;
    this.label = filename.split('.') [0];
    this.imageClickTotal = 0;
    this.y = 0;
}


// Define Global Variables
var images = [];
var votes = [];
var allTimeTotal = [];
var imagesContainer = document.getElementById('imagesContainer');
var results = document.getElementById('results');
var gameTitle = document.getElementsByTagName('h2')[0];
var roundTitle = document.getElementsByTagName('h3')[0];
var instructions = document.getElementsByClassName('instructions')[0];
var progressBar = document.getElementsByClassName('progressBar')[0];
var buttonContainer = document.getElementsByTagName('button')[0];
var clicks = 0;
var threeImages = [];


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

// Build the all time total chart
function buildTotalChart() {
    if(localStorage.getItem('Total Votes') == null) {
        for(var i = 0; i < images.length; i++){
            allTimeTotal.push(images[i]);
        }    
        localStorage.setItem('Total Votes', JSON.stringify(allTimeTotal));
    } else {
        var jsonParse = JSON.parse(localStorage.getItem('Total Votes'));
        for(var jsonParseIndex = 0; jsonParseIndex < jsonParse.length; jsonParseIndex++){
            for(var imageIndex = 0; imageIndex < images.length; imageIndex++){
                if(jsonParse[jsonParseIndex].filename == images[imageIndex].filename) {
                    jsonParse[jsonParseIndex].y += images[imageIndex].y;
                }    
            }    
        }    
        localStorage.setItem('Total Votes', JSON.stringify(jsonParse));
        return jsonParse;
    }    
}    


function generate3Images() {
    gameTitle.innerText = 'Please select 1 of the images below';
    roundTitle.innerText = 'This is round number ' + (clicks + 1);
    buttonContainer.innerHTML = ' ';
    instructions.innerHTML = ' ';
    progressBar.removeAttribute('class', 'hide');
    progressBar.setAttribute('class', 'progressBar');

    if(clicks < 15) {
        var leftImage = Math.floor(Math.random()*images.length);
        var centerImage = Math.floor(Math.random()*images.length);
        var rightImage = Math.floor(Math.random()*images.length);
        threeImages.push(leftImage);
        threeImages.push(centerImage);
        threeImages.push(rightImage);
        imagesContainer.innerHTML = ' ';
        
        while(leftImage == centerImage || leftImage == rightImage || centerImage == rightImage) {
            centerImage = Math.floor(Math.random()*images.length);
            rightImage = Math.floor(Math.random()*images.length);
        }
        
        var createImage = document.createElement('img');
        createImage.setAttribute('src', 'images/' + images[leftImage].filename);
        createImage.setAttribute('class', 'image fadeIn imgFromLeft');
        imagesContainer.appendChild(createImage);
        createImage = document.createElement('img');
        createImage.setAttribute('src', 'images/' + images[centerImage].filename);
        createImage.setAttribute('class', 'image fadeIn imgFromBottom');
        imagesContainer.appendChild(createImage);
        createImage = document.createElement('img');
        createImage.setAttribute('src', 'images/' + images[rightImage].filename);
        createImage.setAttribute('class', 'image fadeIn imgFromRight');
        imagesContainer.appendChild(createImage);
    
    } else {
        results.classList.remove('hide');
        gameTitle.innerText = 'Results';
        roundTitle.innerText = ' ';
        progressBar.setAttribute('class', 'hide');
        imagesContainer.innerHTML = ' ';
        loadChart();
        loadTotalChart();
        showResults();
        }

}


function imageClickCounter(e) {

    document.getElementsByClassName('image')[0].classList.remove('imgFromLeft');
    document.getElementsByClassName('image')[0].classList += ' slideOutToLeft';
    document.getElementsByClassName('image')[1].classList.remove('imgFromBottom');
    document.getElementsByClassName('image')[1].classList += ' slideOutToBottom';
    document.getElementsByClassName('image')[2].classList.remove('imgFromRight');
    document.getElementsByClassName('image')[2].classList += ' slideOutToRight';

    // for(var i = 0; i < 3; i++) {
    //     document.getElementsByClassName('image')[i].classList.remove('fadeIn');
    //     document.getElementsByClassName('image')[i].classList += ' fadeOut';
    // }

    var target = e.target;
    if(target.classList.contains('image')){
        clicks++;
        setTimeout(generate3Images, 800);
    }
    
    var targetSource = target.src;
    var splitTarget = targetSource.split('/');
    var targetSrc = splitTarget[splitTarget.length - 1];
    console.log(targetSrc);

    // Progress Bar
    var firstDash = document.getElementsByClassName('empty')[0];
    firstDash.removeAttribute('class', 'empty');
    firstDash.setAttribute('class', 'full');
    
    for(var imageIndex = 0; imageIndex < images.length; imageIndex++){
        if(images[imageIndex].filename == targetSrc){
            images[imageIndex].imageClickTotal += 1;
            images[imageIndex].y++;
        } 
    }
}

function showResults() {
    var displaySort = document.getElementsByClassName('displaySort')[0];
    var list = document.createElement('ul');
    displaySort.appendChild(list);
    
    var listItem, createImage, clickResults;
    var imagesCopy = images.slice(0);

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
                listItem.appendChild(createImage);
                listItem.appendChild(clickResults);
                list.appendChild(listItem);
                imagesCopy.splice(imageIndex, 1);
            }
        }
    }

    var displayButton = document.getElementsByClassName('restartGame')[0];
    var resetButton = document.createElement('button');
    resetButton.setAttribute('onClick', 'location.reload()');
    resetButton.innerText = 'Restart The Game';
    displayButton.appendChild(resetButton);
    
}


window.addEventListener('load', buildTotalChart);
imagesContainer.addEventListener("click", imageClickCounter);

