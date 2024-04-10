function configurePassFilter() {
    // creates a box container 
    push();
    fill(240, 252, 252); // light turquise 
    stroke(1); // border thickness
    rect(10, 85, 150, 195); // coordinates and size
    pop();

    // dropdown filter selection
    select_pass_filter = createSelect();
    select_pass_filter.position(10, 55);
    select_pass_filter.option('low-pass');
    select_pass_filter.option('high-pass');
    select_pass_filter.option('band-pass');
    select_pass_filter.changed(passFilterListener);

    textSize(12); // size of text labels

    // cutoff frequency slider
    // https://p5js.org/reference/#/p5.Delay/filter
    text('cutoff frequency', 20, 110); // label, x, y position
    pass_filter_cutoff_slider = createSlider(20, 5000, 0, 1); // creates slider with minimum, maximum, starting position and step values
    pass_filter_cutoff_slider.position(20, 115); // x, y position of slider
    let pass_filter_cutoff_label = createP('0%'); // percentage label
    pass_filter_cutoff_label.position(pass_filter_cutoff_slider.x + pass_filter_cutoff_slider.width - 30, pass_filter_cutoff_slider.y - 35); // label position

    // updates label with percentage
    pass_filter_cutoff_slider.input(() => {
        pass_filter_cutoff_label.html(`${Math.floor((pass_filter_cutoff_slider.value() / pass_filter_cutoff_slider.elt.max) * 100)}%`);
    });

    // resonance slider
    //https://p5js.org/reference/#/p5.Filter/res
    text('resonance', 20, 155); // label, x, y position
    pass_filter_resonance_slider = createSlider(0.001, 1000, 0, 0.1); // creates slider with minimum, maximum, starting position and step values
    pass_filter_resonance_slider.position(20, 160); // x, y position of slider
    let pass_filter_resonance_label = createP('0%'); // percentage label
    pass_filter_resonance_label.position(pass_filter_resonance_slider.x + pass_filter_resonance_slider.width - 30, pass_filter_resonance_slider.y - 35); // label position

    // updates label with percentage
    pass_filter_resonance_slider.input(() => {
        pass_filter_resonance_label.html(`${Math.floor((pass_filter_resonance_slider.value() / pass_filter_resonance_slider.elt.max) * 100)}%`);
    });

    // dry/wet slider
    // https://p5js.org/reference/#/p5.Effect/drywet
    text('dry/wet', 20, 200); // label, x, y position
    pass_filter_dry_wet_slider = createSlider(0, 1, 0, 0.01); // creates slider with minimum, maximum, starting position and step values
    pass_filter_dry_wet_slider.position(20, 205); // x, y position of slider
    let pass_filter_dry_wet_label = createP('0%'); // percentage label
    pass_filter_dry_wet_label.position(pass_filter_dry_wet_slider.x + pass_filter_dry_wet_slider.width - 30, pass_filter_dry_wet_slider.y - 35);

    // updates label with percentage
    pass_filter_dry_wet_slider.input(() => {
        pass_filter_dry_wet_label.html(`${Math.floor((pass_filter_dry_wet_slider.value() / pass_filter_dry_wet_slider.elt.max) * 100)}%`);
    });

    // output level slider
    // https://p5js.org/reference/#/p5.AudioIn/output
    text('output', 20, 245); // label, x, y position
    pass_filter_output_slider = createSlider(0, 1, 0.44, 0.01); // creates slider with minimum, maximum, starting position and step values
    pass_filter_output_slider.position(20, 250); // x, y position of slider
    let outputLabel = createP('44%'); // percentage label
    outputLabel.position(pass_filter_output_slider.x + pass_filter_output_slider.width - 30, pass_filter_output_slider.y - 35); // label position

    // updates label with percentage
    pass_filter_output_slider.input(() => {
        outputLabel.html(`${Math.floor((pass_filter_output_slider.value() / pass_filter_output_slider.elt.max) * 100)}%`);
    });
}

// updates pass filters based on value of sliders
function updatePassFilter() {
    pass_filter.freq(pass_filter_cutoff_slider.value());
    pass_filter.res(pass_filter_resonance_slider.value());
    pass_filter.drywet(pass_filter_dry_wet_slider.value());
    pass_filter.output.gain.value = pass_filter_output_slider.value() * master_volume_slider.value();
}

// event listerner for pass filter 
function passFilterListener() {
    pass_filter_kind = select_pass_filter.value();
    setupSoundProcessing();
}