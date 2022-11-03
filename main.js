Status = "";
input_text = "";
objects = [];

function setup() {
  canvas = createCanvas(300, 290);
  canvas.position(480, 250);
  video = createCapture(VIDEO);
  video.size(300, 290);
  video.hide();
}

function start() {
  object_detector = ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  input_text = document.getElementById("input_id").value;
}

function modelLoaded() {
  console.log("model_loaded");
  Status = true;
}

function draw() {
  image(video, 0, 0, 300, 290);
  if(Status != ""){
    object_detector.detect(video,gotResults);
    for(i = 0;i < objects.length;i++){
      document.getElementById("status").innerHTML = "Objects Detecting";
      console.log(objects.length);
      fill("#FF000");
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
      noFill();
      stroke("#FF000");
      rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

      if(objects[i].label == input_text){
        video.stop();
        objectDetector.detect(gotResults);
        document.getElementById("object_found").innerHTML = input_text+"Found";
        var synth = window.speechSynthesis;
        var utterThis = new SpeechSynthesisUtterance(input_text+"found");
        synth.speak(utterThis);
      }
      else{
        document.getElementById("object_found").innerHTML = input_text+"Not found";
      }

    }
  }
}

function gotResults(error, results) {
  if(error){
  console.log(error);
  }
  console.log(results);
  object = results;
  }