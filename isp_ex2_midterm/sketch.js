function preload() {
    soundFormats('wav', 'mp3'); // acceptable formats
    audio_file = loadSound('/assets/kalte_ohren_remix.mp3');
}

function setup() {
    createCanvas(canvas_width, canvas_height);
    initializeVariables(); // initialize variables
    setupSpeechRecognition(); // setup voice recognition
    setupPlayAndStopButton(); // setup play and stop button (one button)
    setupWarningMessage(); // setup display of disclaimer
    setupSoundProgressBar(); // setup music progress bar

    // setup meyda analyzer 
    if (isMeydaAvailable()) {
        createAudioAnalyzer();
    } else {
        console.log("Error. Meyda is not available.");
    }

    amplitude = new p5.Amplitude(); // access p5 amplitude
    is_setup_finished = true; // flag
}

function draw() {
    // if background is not used by voice recognition set it to black  
    if (!voice_background_color) {
        background(default_background_color);
    } else {
        background(voice_background_color);
    }

    // if music is not playing display discalimer 
    if (!isAudioPlaying() && warning_message) {
        warning_message.position(play_stop_button.x - warning_message.elt.offsetWidth / 2, play_stop_button.y - warning_message.elt.offsetHeight / 2 - 30);
        return;
    }

    // if music is playing draw progress bar and forms
    if (isAudioPlaying()) {
        progress_bar_slider.value(audio_file.currentTime() / audio_file.duration());
        createFormAttributes();
        drawForms();
    } else {
        console.log("Forms are not displaying when sound is playing.");
    }
}