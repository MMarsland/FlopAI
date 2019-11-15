class App {
  constructor() {
    this.sessionName = "Default";
    this.view = "welcome";
    this.sessionFile = defaultGameFile;
  }

  updateSidebar() {
    // Update Move count
    document.getElementById("moveNum").innerHTML = ("Moves: "+game.moveNum);
    document.getElementById("brainName").innerHTML = "Name: "+ai.brain.name;
    document.getElementById("brainTraits").innerHTML = "Traits: "+ai.brain.traits;
  }

  back() {
    // Back to home
    //Find current getLocation and go back based on that
    // victory&board -> home -> welcome -> N/A
    this.changeViewTo(this.getBackView());
  }

  getBackView() {
    let backView;
    if (this.view == "board" || this.view == "victory") {
      backView = "home";
    } else {
      backView = "welcome";
    }
    return backView;
  }

  changeViewTo(viewName) {
    // Add hidden to all views
    //Remove Hidden from desired view
    // set the currentView variable
    let frames = document.getElementsByClassName("frame");
    for (let i=0; i<frames.length; i++) { let frame = frames[i];
      frame.classList.add("hidden");
    }
    let view = document.getElementById(viewName);
    view.classList.remove("hidden");
    this.view = viewName;
  }

  // Ready the default Game File
  startDefault() {
    // TODO: Set the session to the default session


    //Run Play with the default
    this.play();
  }

  play() {
    // TODO: Load the current Session File info into gameFile


    // Then go to home
    this.changeViewTo("home");
  }

  saveGame() {
    if (this.sessionName == "") {
      this.saveAs();
    } else {
      this.saveGameFile(this.sessionName);
    }
  }

  saveAs() {
    let name = prompt("What would you like to save your game as?", "BestGame");
    if (name == null) { // Null or empty str
      return;
    }
    if (name == "") {
      name = "gameFile";
    } else if (name == "default" || name == "Default") {
      let randomName = System.getRandomTrait()+System.getRandomName();
      if (confirm("Don't do this man, it's just gonna confuse you, and probably me too. Let's pick a better name! How about " + randomName + "?")) {
        name = randomName;
      } else {
        return;
      }
    }
    this.saveGameFile(name);
    this.setSessionName(name);
  }

  saveGameFile(name) {
    // TODO: Finish this with proper form
    let text = System.getTabbedText(0, "FlopAI Game File:");
    text += System.getTabbedText(0, "{");
    text += System.getTabbedText(1, "Name: '"+name+"'");
    // Get Map Text
    text += System.getTabbedText(1, mapManager.getMapsText());
    // Get Brain Text
    text += System.getTabbedText(1, ai.brain.getBrainText());
    text += System.getTabbedText(0, "}", true);
    System.download(name, text);
  }

  readGameFile() {
    console.log("Should read the file and do something with it!");
    System.readFile("gameFileInput", app.validateGameFile);
  }

  toggleDefaultPlay(mode) {
    if (mode == "play") {
      document.getElementById("play").classList.remove("hidden");
      document.getElementById("default").classList.add("hidden");
    } else {
      document.getElementById("play").classList.add("hidden");
      document.getElementById("default").classList.remove("hidden");
    }
  }

  validateGameFile(text) {
    let key = text.substring(0, text.indexOf("\n"));
    if(key == "FlopAI Game File:") {
      // Good
      app.setGameSession(text);
    } else {
      alert("The uploaded file was not recognized as a FlopAI Game File.");
    }
  }

  setGameSession(text) {
    //Update Session File
    app.sessionFile = text;
    // Name
    System.getTextNodes(text);
    // Maps
    // Brain


    //Session Name
    app.readSessionName(text);
    MapManager.
    // Session updated
    //Change Default to play
    this.toggleDefaultPlay("play");
  }

  // TODO: Ensure this works with the final game files
  readSessionName(text) {
    let nameText = text.substring(text.indexOf("Name:"));
    this.setSessionName(nameText.substring(6, nameText.indexOf("\n")));
  }

  setSessionName(name) {
    this.sessionName = name;
    document.getElementById("sessionName").innerHTML = "Session Name: "+name;
  }

  resetToDefault() {
    // Add more here later to upload defaults
    if (confirm("Are you sure you want to reset to the default game file?")) {
      this.setGameSession(defaultGameFile);
      //this.toggleDefaultPlay("default");
    }
  }
}






























/* Depreciated Functions */
/*
  function processGameFile(gameText) {
    brain.encodeBrain(gameText);
    readyGameSession();
  }



  function readyGameSession() {
    gameSessionReady = true;
    document.getElementById("play").classList.remove("disabledPlay");
    document.getElementById("play").classList.add("pulse");
  }

  function play() {
    if (gameSessionReady) {
      changeViewTo("home");
    }
  }


*/
