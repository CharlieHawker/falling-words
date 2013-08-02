HTMLElement.prototype.dumpWords = function() {
  fw = new FallingWords(this);
};

FallingWords = function(targetElement) {
  var self = this;
  
  self.targetElement = targetElement;
  self.container = document.createElement('div');
  self.text = self.targetElement.innerHTML.replace(/^\s+|\s+$/g, '');
  self.resetText = document.createElement('p');
  self.container.setAttribute('id', 'fw-wrap');
  
  // Build the necessaries...
  self.createResetLink();
  self.replaceText();
  
  // Replace the original paragraph with the doctored one
  self.targetElement.parentNode.appendChild(self.container);
  self.targetElement.style.display = 'none';  
};


FallingWords.prototype.createResetLink = function() {
  var self = this;
  
  // Configure the reset text
  self.resetText.innerHTML = 'Out of words? <a href="#" id="fw-restart">Start again</a>.';
  self.resetText.style.display = 'none';
  self.resetText.children[0].onclick = function() {
    self.resetText.style.display = 'none';
    self.replaceText();
    return false;
  };
  self.targetElement.parentNode.insertBefore(self.resetText, self.targetElement);
}


FallingWords.prototype.replaceText = function() {
  var self = this,
      word = document.createElement('div');

  word.setAttribute('class', 'word')      
  
  // Loop over the paragraph and create a div for each word filled with child divs for each letter
  for (var i = 0; i < self.text.length; i++) {
    
    // Create a new word div if we've had a space
    if (i > 0 && self.text[i - 1] == ' ') {
      word = document.createElement('div');
      word.setAttribute('class', 'word');
    }
    
    // Create a letter
    var letter = document.createElement('div');
    letter.setAttribute('class', 'letter');
    letter.innerHTML = self.text[i].replace(' ', '&nbsp;');
    
    // Add the letter to its word div
    word.appendChild(letter);

    if (i == (self.text.length - 1) || self.text[i] == ' ') {
      // Bind an event listener for the end of the animation to self-propogate it by removing from DOM
      word.addEventListener('webkitAnimationEnd', function (e) {
        self.removeWord(this);
      });
      
      // Append word to duplicate of paragraph
      self.container.appendChild(word);
    }
  }
}


FallingWords.prototype.removeWord = function(word) {
  var self = this;
      parent = word.parentNode;
  word.style.display = 'none';
  parent.removeChild(word);
  
  // Show the reset paragraph if there's no words left
  if (parent.children.length == 0)
  {
    self.resetText.style.display = 'block';
  }
}