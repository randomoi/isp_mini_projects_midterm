// handles setup of play/stop button with controlPlayStopSound (button helper)
function setupPlayAndStopButton() {
    play_stop_button = buttonHelper('Play', width / 2, height / 2, controlPlayStopSound);
}

// https://commons.wikimedia.org/wiki/Template:Seizure_warning
// handles warming message before visualization begins
function setupWarningMessage() {
    warning_message = createDiv('WARNING: This video may potentially trigger seizures for people with photosensitive epilepsy.').position(width / 2, height / 2 - 42);
    warning_message.style('text-align', 'center');
    warning_message.style('color', 'red');
}

// hanldes progress bar for the audio 
function setupSoundProgressBar() {
    // slider position and style 
    progress_bar_slider = createSlider(0, 1, 0, 0.05);
    progress_bar_slider.position(5, height - 18);
    progress_bar_slider.style('width', '800px');

    // sets up even handlers 
    progress_bar_slider.input(updatePlaybackPosition);
    progress_bar_slider.mousePressed(pauseSoundUpdatePlaybackPosition);
    progress_bar_slider.mouseReleased(playSoundFile);
}


// sets up button helper with button elements 
function buttonHelper(label, x, y, callback) {
    let button = createButton(label); // creates button with a label
    button.position(x, y); // x, y button coorindates
    button.mousePressed(callback); // callback function 
    return button;
}

// handles play and stop button interractions 
function controlPlayStopSound() {
    if (isAudioPlaying()) { // if audio is playing 
        audio_file.stop(); // stop the audio file
        play_stop_button.position(width / 2, height / 2); // move the button to the center of the canvas
        play_stop_button.html('Play'); // change label 
        warning_message.show(); // display disclaimer
        isPlaying = false; // flag
    } else {
        // this was created to handle warnings from Chrome Browser it handles the playback only with user interraction 
        // console browser warnings go away after user presses play button 
        userStartAudio().then(() => {
            playSoundFile(); // play music
            play_stop_button.position(width - 50, 25); // change position of play button once it's clicked to the top right corner  
            play_stop_button.html('Stop'); // change label
            warning_message.hide(); // hide disclaimer
            isPlaying = true; // flag
        });
    }
}

// checks if audio is playing
function isAudioPlaying() {
    return audio_file.isPlaying();
}

// pauses sound and updates position of the music 
function pauseSoundUpdatePlaybackPosition() {
    if (isAudioPlaying()) {
        audio_file.pause();
        updatePlaybackPosition();
    }
}

// updates playback position using jump()
function updatePlaybackPosition() {
    let progress_bar_position = progress_bar_slider.value() * audio_file.duration(); // assigns position of the slider and * by duration
    audio_file.jump(progress_bar_position); // changes position of slider (not very smooth)
    if (!audio_file.isPlaying() && play_stop_button.html() === 'stop') { // if music is not playing and stop button is present
        audio_file.play(); // play music
    }
}

// Function to play the sound
// handles playing of music and changes button name 
function playSoundFile() {
    audio_file.loop();
    play_stop_button.html('stop');
}

// References //
// https://p5js.org/reference/#/p5/createButton
// https://p5js.org/reference/#/p5.Element/position
// https://p5js.org/reference/#/p5.Element/mousePressed
// https://p5js.org/reference/#/p5/userStartAudio
// https://p5js.org/reference/#/p5.SoundFile/isPlaying
// https://p5js.org/reference/#/p5.Element/html
// https://p5js.org/reference/#/p5.Element/hide
// https://p5js.org/reference/#/p5.Element/show
// https://p5js.org/reference/#/p5.SoundFile/jump
// https://p5js.org/reference/#/p5.SoundFile/duration
// https://p5js.org/reference/#/p5.SoundFile/pause
// https://p5js.org/reference/#/p5.SoundFile/isPlaying