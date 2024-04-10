// setups internal signal flow
// https://p5js.org/reference/#/p5.Distortion
// https://p5js.org/reference/#/p5.Compressor
// https://p5js.org/reference/#/p5.Reverb
// https://p5js.org/reference/#/p5.Gain
// https://p5js.org/reference/#/p5.Delay
// https://p5js.org/reference/#/p5.FFT
function setupSoundProcessing() {
    pass_filter = new p5.LowPass(); // default filter Low Pass

    configurePassFilterDropdown(); // calls dropdown for pass filters 

    // initialize filters
    wave_distortion = new p5.Distortion();
    delay_filter = new p5.Delay();
    dynamic_compressor = new p5.Compressor();
    reverb_filter = new p5.Reverb();
    master_volume = new p5.Gain();
    microphone = new p5.AudioIn();

    fft_in = new p5.FFT(); // analyze unprocessed sound
    fft_out = new p5.FFT(); // analyze processed sound

    setInitialSliderValues(); // set initial values of sliders, this guaranteed that audio file sounded well, otherwise the sound was distorted

    configureFileMicSwitch(); // configures switching between file and microphone

    // coonecting effects based on specified internal signal flow
    // sound file -> low-pass filter -> waveshaper distortion -> delay -> dynimic compressor -> reverb -> master volume -> computer
    connectEffect(wave_distortion, pass_filter, master_volume);
    connectEffect(delay_filter, wave_distortion, master_volume);
    connectEffect(dynamic_compressor, delay_filter, master_volume);
    connectEffect(reverb_filter, dynamic_compressor, master_volume);

    master_volume.connect();

    // set input of FFT to master volume
    fft_out.setInput(master_volume);
}

// sets up connection of filter effects
function connectEffect(effect, input_mode, master) {
    effect.disconnect();
    effect.process(input_mode);
    master.setInput(input_mode);
}

// sets up initial slider values 
function setInitialSliderValues() {
    updateReverb();
    updatePassFilter();
    updateMasterVolume();
    updateWaveDistortion();
    updateDynamicCompressor();
}

let reduce_volume = 0.2; // reduces volume by x 

// configures switching between file and microphone
function configureFileMicSwitch() {
    let dropdown_mode = input_mode_dropdown.value();
    try {
        switch (dropdown_mode) { // switch between file
            case 'file':
                // stop and disconnect microphone before working with sound player
                microphone.stop();
                microphone.disconnect();
                // if is loaded 
                if (sound_player.isLoaded()) {
                    sound_player.disconnect();
                    pass_filter.process(sound_player);
                    fft_in.setInput(sound_player); // start sound player 
                } else {
                    console.error("The file is not loaded. ");
                }
                break;
            case 'microphone': // switch between microphone
                // stop and disconnect sound player before working with microphone
                sound_player.stop();
                sound_player.disconnect();
                microphone.start(
                    // callback to try to reduce the feeback in the microphone output
                    () => {
                        microphone.disconnect();
                        reduce_volume.connect(audio_context.destination);
                        pass_filter.process(microphone);
                        fft_in.setInput(microphone); // start microphone
                    },
                    // callback - error to be printed in console
                    (error) => {
                        console.error("Microphone doesn't work: ", error);
                    }
                );
                break;
            default:
                console.error("You have an error. Please check switch between file and mic.");
        }

    } catch (error) {
        console.error('Error:', error);

    }
}