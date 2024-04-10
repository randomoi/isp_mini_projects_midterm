function configureWaveDistortion() {
    // creates rectangle around sliders
    push();
    fill(240, 252, 252); // light turquise 
    stroke(1); // border thickness
    rect(195, 325, 150, 200); // coordinates and size
    pop();

    // header
    textSize(14); // text size 
    text('waveshaper distortion', 195, 310); // label, x, y position

    textSize(12); // size of text labels

    // distortion amount slider
    // https://p5js.org/reference/#/p5.WaveShaper
    text('amount', 205, 350); // label, x, y position
    wave_distortion_amount_slider = createSlider(0, 1, 0, 0.01); // creates slider with minimum, maximum, starting position and step values
    wave_distortion_amount_slider.position(200, 355); // x, y position of slider
    let wave_distortion_amount_label = createP('0%'); // percentage label
    wave_distortion_amount_label.position(wave_distortion_amount_slider.x + wave_distortion_amount_slider.width - 30, wave_distortion_amount_slider.y - 35);

    // updates label with percentage
    wave_distortion_amount_slider.input(() => {
        wave_distortion_amount_label.html(`${Math.floor((wave_distortion_amount_slider.value() / wave_distortion_amount_slider.elt.max) * 100)}%`);
    });

    // oversample slider
    // https://p5js.org/reference/#/p5.Distortion
    text('oversample', 205, 390); // label, x, y position
    wave_distortion_oversample_slider = createSlider(0, 4, 0, 0.5); // creates slider with minimum, maximum, starting position and step values
    wave_distortion_oversample_slider.position(200, 395); // x, y position of slider
    let wave_distortion_oversample_label = createP('0%'); // percentage label
    wave_distortion_oversample_label.position(wave_distortion_oversample_slider.x + wave_distortion_oversample_slider.width - 30, wave_distortion_oversample_slider.y - 35);

    // updates label with percentage
    wave_distortion_oversample_slider.input(() => {
        wave_distortion_oversample_label.html(`${Math.floor((wave_distortion_oversample_slider.value() / wave_distortion_oversample_slider.elt.max) * 100)}%`);
    });

    text('dry/wet', 205, 435); // label, x, y position
    wave_distortion_dry_wet_slider = createSlider(0, 1, 0, 0.01); // creates slider with minimum, maximum, starting position and step values
    wave_distortion_dry_wet_slider.position(200, 440); // x, y position of slider
    let wave_distortion_dry_wet_label = createP('0%'); // percentage label
    wave_distortion_dry_wet_label.position(wave_distortion_dry_wet_slider.x + wave_distortion_dry_wet_slider.width - 30, wave_distortion_dry_wet_slider.y - 35);

    // updates label with percentage
    wave_distortion_dry_wet_slider.input(() => {
        wave_distortion_dry_wet_label.html(`${Math.floor((wave_distortion_dry_wet_slider.value() / wave_distortion_dry_wet_slider.elt.max) * 100)}%`);
    });

    text('output', 205, 475); // label, x, y position
    wave_distortion_output_slider = createSlider(0, 1, 1, 0.01); // creates slider with minimum, maximum, starting position and step values
    wave_distortion_output_slider.position(200, 480); // x, y position of slider
    let wave_distortion_output_label = createP('0%'); // percentage label
    wave_distortion_output_label.position(wave_distortion_output_slider.x + wave_distortion_output_slider.width - 30, wave_distortion_output_slider.y - 35);

    // updates label with percentage
    wave_distortion_output_slider.input(() => {
        wave_distortion_output_label.html(`${Math.floor((wave_distortion_output_slider.value() / wave_distortion_output_slider.elt.max) * 100)}%`);
    });
}

// updates wave distortion based on value of sliders
function updateWaveDistortion() {
    const oversample_values = ['', 'none', '2x', '', '4x']; // oversample values
    const oversample_index = wave_distortion_oversample_slider.value(); // pull oversample slider value
    const wave_distortion_value = oversample_values[oversample_index]; // oversample value based on index

    wave_distortion.set(wave_distortion_amount_slider.value(), wave_distortion_value);
    wave_distortion.drywet(wave_distortion_dry_wet_slider.value());
    wave_distortion.amp(wave_distortion_output_slider.value());
}