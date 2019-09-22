class App {
  constructor() {
    this.sessionName = "";
    this.view = "welcome";
    this.sessionFile;
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
  start() {

  }

  play() {
    // Load the current Session
    // TEMP: for now just go to home
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
    }
    this.saveGameFile(name);
    this.sessionName = name;
  }

  saveGameFile(name) {
    let text = "FlopAI Game File:\n"
    text += "Name: "+name+"\n";
    text += ai.brain.getBrainText();
    System.download(name, text);
  }

  readGameFile() {
    console.log("Should read the file and do something with it!");
    System.readFile("gameFileInput");
  }

  resetToDefault() {
    // Add more here later to upload defaults
    if (confirm("Are you sure you want to start a new game file?")) {
      this.sessionName = "default";
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
