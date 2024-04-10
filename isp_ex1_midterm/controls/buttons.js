// https://p5js.org/reference/#/p5.SoundRecorder
// https://p5js.org/reference/#/p5.SoundRecorder/record
// https://p5js.org/reference/#/p5/save
// https://p5js.org/reference/#/p5.SoundRecorder/stop
// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout

// configures buttons
// https://p5js.org/reference/#/p5/createButton
function configureButtons() {
    pause_button = setButtonStyle('pause', 10, 20, 'pause_button_id'); // label, x coordinate, y coordinate, button id
    play_button = setButtonStyle('play', 80, 20, 'play_button_id'); // label, x coordinate, y coordinate, button id
    stop_button = setButtonStyle('stop', 140, 20, 'stop_button_id'); // label, x coordinate, y coordinate, button id
    skip_to_start_button = setButtonStyle('skip to start', 200, 20, 'skip_to_start_button_id'); // label, x coordinate, y coordinate, button id
    skip_to_end_button = setButtonStyle('skip to end', 300, 20, 'skip_to_end_button_id'); // label, x coordinate, y coordinate, button id
    loop_button = setButtonStyle('loop', 400, 20, 'loop_button_id'); // label, x coordinate, y coordinate, button id
    record_button = setButtonStyle('record', 575, 20, 'record_button_id'); // label, x coordinate, y coordinate, button id
}

// sets up style of buttons 
// https://p5js.org/reference/#/p5.Element/position
// https://p5js.org/reference/#/p5.Element/id
// https://p5js.org/reference/#/p5.Element/style
function setButtonStyle(label, coordX, coordY, id) {
    let button = createButton(label); // assign to button, button + label
    button.position(coordX, coordY); // coordinates of button
    button.id(id); // id of button
    button.style('background-color', button_color); // button background 
    button.style('border', button_border); // button border 
    return button;
}

// button click handler
// https://p5js.org/reference/#/p5/select
// https://p5js.org/reference/#/p5.Element/mouseClicked
function buttonHandler() {
    select("#pause_button_id").mouseClicked(pauseButtonClick);
    select("#play_button_id").mouseClicked(playButtonClick);
    select("#stop_button_id").mouseClicked(stopButtonClick);
    select("#skip_to_start_button_id").mouseClicked(skipToStartButtonClick);
    select("#skip_to_end_button_id").mouseClicked(skipToEndButtonClick);
    select("#loop_button_id").mouseClicked(loopButtonClick);
    select("#record_button_id").mouseClicked(recordButtonClick);
    select("#reverse_button_id").mouseClicked(reverseButtonClick);
}

// handles clicks of pause button 
// https://p5js.org/reference/#/p5.SoundFile/isPlaying
// https://p5js.org/reference/#/p5.SoundFile/pause
function pauseButtonClick() {
    if (sound_player && sound_player.isPlaying()) { // if sound player exists and is playing
        sound_player.pause(); // pause, if sound player is playing
        console.log('Pause Button Clicked:', sound_player); // display messgae in console
    }
}

// handles clicks of play button 
// https://p5js.org/reference/#/p5.SoundFile/play
function playButtonClick() {
    if (sound_player && !sound_player.isPlaying()) { // if sound player exists and is playing
        sound_player.play(); // start playing, if sound player is not playing
        console.log('Play Button Clicked:', sound_player); // display messgae in console
    }
}

// handles clicks of stop button 
// https://p5js.org/reference/#/p5.SoundFile/stop
function stopButtonClick() {
    if (sound_player) { // if sound player exists
        sound_player.stop(); // stop playing, if sound player exists
        console.log('Stop Button Clicked:', sound_player); // display messgae in console
    }
}

// handles clicks of skip to start button 
// https://p5js.org/reference/#/p5.SoundFile/stop
// https://p5js.org/reference/#/p5.SoundFile/play
function skipToStartButtonClick() {
    if (sound_player) { // if sound player exists
        sound_player.stop(); // stop playing, if sound player exists
        sound_player.play(); // start playing from the beginning
        console.log('Skip to Start Button Clicked:', sound_player); // display messgae in console
    }
}

// handles clicks of skip to end button 
// https://p5js.org/reference/#/p5.SoundFile/stop
// https://p5js.org/reference/#/p5.SoundFile/play
function skipToEndButtonClick() {
    if (sound_player) { // if sound player exists
        let updated_position = sound_player.duration() - 1; // time before ending minus 1 second
        updated_position = Math.max(0, updated_position); // check for negative values
        sound_player.stop(); // stop playing, if sound player is playing

        // handles the skipping to the end minus 1 second 
        sound_player.onended = function() {
            sound_player.jump(updated_position);
            sound_player.play();
        }
        console.log('Skip to End Button Clicked:', sound_player); // display messgae in console
    }
}

// handles clicks of loop button 
// https://p5js.org/reference/#/p5.SoundFile/isLooping
// https://p5js.org/reference/#/p5.SoundFile/loop
function loopButtonClick() {
    let loop_button_id = select("#loop_button_id");
    if (sound_player) { // first check if sound player exists
        if (!sound_player.isLooping()) { // if its not looping
            loop_button_id.html("loop ||"); // update label to include ||
            if (sound_player.isPlaying()) { // if sound player is playing
                let current_time = sound_player.currentTime(); // get current time of sound
                sound_player.stop(); // stop sound player
                sound_player.loop(0, 1, 1, current_time); // start looping from current time
            } else { // is sound player is not playing
                sound_player.loop(); // start looping from begining
                console.log('Loop Button Clicked:', sound_player); // display messgae in console
            }
        } else {
            loop_button_id.html("loop"); // if sound player is not looping, change button to loop
            sound_player.setLoop(false); // set looping to false
            console.log('Loop Button Paused:', sound_player); // display messgae in console
        }
    }
}


// handles saving of recorded sound
// https://p5js.org/reference/#/p5.SoundRecorder
// https://p5js.org/reference/#/p5.SoundRecorder/record
// https://p5js.org/reference/#/p5.SoundRecorder/stop
// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
// https://p5js.org/reference/#/p5/save
let recording = false;

function saveRecordedFile() {
    let recording_name = "recording.wav"; // assign nane to recording
    save(audio_file, recording_name); // save file and name
}

// handles clicks of record button 
function recordButtonClick() {
    if (recording) { // if recording 
        document.querySelector("#record_button_id").innerHTML = "start recording"; // change button label
        sound_recorder.stop(); // stop recording
        setTimeout(saveRecordedFile, 10); // save file after specified time
        recording = false;
        console.log('Stop Recording Button Clicked:', sound_recorder); // display messgae in console
    } else { // if not recording
        document.querySelector("#record_button_id").innerHTML = "stop recording"; // change button label
        sound_recorder.record(audio_file); // start recording
        recording = true;
        console.log('Record Button Clicked:', sound_recorder); // display messgae in console
    }
}

// handles state changing of reverse button 
function reverseButtonClick() {
    isReversed = !isReversed;
    updateReverb();
    console.log('Reverse reverb toggled:', isReversed); // display messgae in console
    reverse_button.html(isReversed ? 'Reverse On' : 'Reverse');

    reverb_duration_slider.value(3); // reset duration slider values
    reverb_decay_slider.value(2); // reset decay slider values

    reverb_duration_label.html('0%'); // reset duration slider percentage
    reverb_decay_label.html('0%'); // reset decay slider percentage
}