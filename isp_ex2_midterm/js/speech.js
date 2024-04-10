// https://p5js.org/reference/#/p5.SpeechRec
// https://p5js.org/reference/#/p5.SpeechRec/resultValue
// https://p5js.org/reference/#/p5.SpeechRec/resultString
// sets up speech recognition
function setupSpeechRecognition() {
    voice_recognized = new p5.SpeechRec('en-US', speechRecognitionResult);
    voice_recognized.continuous = true;
    voice_recognized.interimResults = true;
    voice_recognized.onResult = function() {
        if (voice_recognized.resultValue) {
            speechRecognitionResult();
        }
    };
    voice_recognized.start();
}

// handles voice recognition commands results
function speechRecognitionResult() {
    if (voice_recognized.resultValue) {
        let voice_command = voice_recognized.resultString.toLowerCase();
        console.log('Voice detected:', voice_command);

        if (voice_command.includes('black')) { // if command is "black", display black background
            console.log('"Black" voice command recognized.'); // prints in console for verification
            voice_background_color = color(0, 0, 0); // switch to black
        } else if (voice_command.includes('white')) { // if command is "white", display white background
            console.log('"White" voice command recognized.'); // prints in console for verification
            voice_background_color = color(255, 255, 255); // switch to white
        } else if (voice_command.includes('red')) { // if command is "red", display red background
            console.log('"Red" voice command recognized.'); // prints in console for verification
            voice_background_color = color(252, 107, 96); // switch to red
        } else if (voice_command.includes('blue')) { // if command is "blue", display blue background
            console.log('"Blue" voice command recognized.'); // prints in console for verification
            voice_background_color = color(114, 194, 247); // switch to blue
        } else if (voice_command.includes('green')) { // if command is "green", display green background
            console.log('"Green" voice command recognized.'); // prints in console for verification
            voice_background_color = color(183, 245, 176); // switch to green
        } else if (voice_command.includes('rectangle')) { // if command is "rectangle"
            console.log('"Rectangle" voice command recognized.'); // prints in console for verification
            switchForm('rectangle'); // switch to rectangle
            displayForm(); // display form 
        } else if (voice_command.includes('triangle')) { // if command is "triangle"
            console.log('"Triangle" voice command recognized.'); // prints in console for verification
            switchForm('triangle'); // switch to triangle
            displayForm(); // display form 
        } else if (voice_command.includes('circle')) { // if command is "circle"
            console.log('"Circle" voice command recognized.'); // prints in console for verification
            switchForm('circle'); // switch to circle
            displayForm(); // display form 
        } else if (voice_command.includes('pentagon')) { // if command is "pentagon"
            console.log('"Pentagon" voice command recognized.'); // prints in console for verification
            switchForm('pentagon'); // switch to pentagon
            displayForm(); // display form 
        } else if (voice_command.includes('square')) { // if command is "square"
            console.log('"Square" voice command recognized.'); // prints in console for verification
            switchForm('square'); // switch to square
            displayForm(); // display form 
        }
    }
}