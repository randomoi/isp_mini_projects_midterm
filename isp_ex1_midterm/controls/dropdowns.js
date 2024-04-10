// setups pass filter based on kind selected
// https://p5js.org/reference/#/p5.Filter
function configurePassFilterDropdown() {
    if (pass_filter_kind === 'low-pass') { // if filter is low-pass
        pass_filter = new p5.LowPass(); // create low-pass filter
        console.log('Filter changed to: LowPass');
    } else if (pass_filter_kind === 'high-pass') { // if filteris high-pass
        pass_filter = new p5.HighPass(); // create high-pass filter
        console.log('Filter changed to: HighPass');
    } else if (pass_filter_kind === 'band-pass') { // if filter is band-pass
        pass_filter = new p5.BandPass(); // create band-pass filter
        console.log('Filter changed to: BandPass');
    }
}

// setups input mode for sound processing
// https://p5js.org/reference/#/p5.AudioIn
// https://p5js.org/reference/#/p5.SoundFile
// configure dropdown for file and microphone
function configureModeDropdown() {
    input_mode_dropdown = createSelect();
    input_mode_dropdown.position(460, 20);
    input_mode_dropdown.option('file');
    input_mode_dropdown.option('microphone');
    input_mode_dropdown.changed(configureFileMicSwitch);
    input_mode_dropdown.style('background-color', button_color);
    input_mode_dropdown.style('border', button_border);

    // audio context for microphone
    audio_context = getAudioContext();

    // controls volume of micrpohone
    reduce_volume = audio_context.createGain();
}