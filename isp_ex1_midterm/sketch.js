// https://p5js.org/reference/#/p5.SoundRecorder
// https://p5js.org/reference/#/libraries/p5.sound
// https://p5js.org/reference/#/p5.SoundFile


function preload() {
    sound_player = loadSound('assets/audio/audacity_poem.wav');
}

// sets up background, GUI, button handler and sound
function setup() {
    createCanvas(width, height); // create canvas
    background(146, 252, 246); // turquise color
    configureGUI(); // setup GUI 
    setupSoundProcessing(); // setup sound processing
    buttonHandler(); // add button handler
    sound_recorder = new p5.SoundRecorder();
    audio_file = new p5.SoundFile(); // empty file 
    sound_recorder.setInput(master_volume); // set input
}

// call update filter functions and spectrum
function draw() {
    updatePassFilter();
    updateWaveDistortion();
    updateDelay();
    updateDynamicCompressor();
    updateMasterVolume();
    drawInOutSpectrums();
}

// call all configure functions
function configureGUI() {
    configureButtons()
    configureModeDropdown();
    configurePassFilter();
    configureDynamicCompressor();
    configureMasterVolume();
    configureReverb();
    configureWaveDistortion();
    configureDelay();
    configureSpectrumLabels();
}