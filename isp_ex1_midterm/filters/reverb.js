function configureReverb() {
    // creates rectangle around sliders
    push();
    fill(240, 252, 252); // light turquise 
    stroke(1); // border thickness
    rect(10, 325, 150, 200); // coordinates and size
    pop();

    // header 
    textSize(14); // text size 
    text('reverb', 15, 310); // label, x, y position

    textSize(12); // text size of labels

    // reverb duration slider
    // https://p5js.org/reference/#/p5.Reverb
    // https://p5js.org/reference/#/p5.Reverb/set
    // https://p5js.org/reference/#/p5.Reverb/process
    text('reverb duration', 20, 350); // label, x, y position
    reverb_duration_slider = createSlider(0, 10, 0, 1); // creates slider with minimum, maximum, starting position and step values
    reverb_duration_slider.position(20, 355); // x, y position of slider
    // NOTE: label variable was declared outside of function (in globals.js) to be able to update values when reverse button is clicked
    reverb_duration_label = createP('0%'); // percentage label
    reverb_duration_label.position(reverb_duration_slider.x + reverb_duration_slider.width - 30, reverb_duration_slider.y - 35); // label position

    // Update the text labels with percentage values
    reverb_duration_slider.input(() => {
        reverb_duration_label.html(`${Math.floor((reverb_duration_slider.value() / reverb_duration_slider.elt.max) * 100)}%`);
    });

    // decay rate slider
    // https://p5js.org/reference/#/p5.Reverb
    // https://p5js.org/reference/#/p5.Reverb/set
    // https://p5js.org/reference/#/p5.Reverb/process
    text('decay rate', 20, 390); // label, x, y position
    reverb_decay_slider = createSlider(0, 100, 2, 1); // creates slider with minimum, maximum, starting position and step values
    reverb_decay_slider.position(20, 395); // x, y position of slider
    // NOTE: label variable was declared outside of function (in globals.js) to be able to update values when reverse button is clicked
    reverb_decay_label = createP('0%'); // percentage label
    reverb_decay_label.position(reverb_decay_slider.x + reverb_decay_slider.width - 30, reverb_decay_slider.y - 35); // label position

    // updates label with percentage
    reverb_decay_slider.input(() => {
        reverb_decay_label.html(`${Math.floor((reverb_decay_slider.value() / reverb_decay_slider.elt.max) * 100)}%`);
    });

    // dry/wet slider
    // https://p5js.org/reference/#/p5.Effect/drywet
    text('dry/wet', 20, 460); // label, x, y position
    reverb_dry_wet_slider = createSlider(0, 1, 0, 0.01); // creates slider with minimum, maximum, starting position and step values
    reverb_dry_wet_slider.position(20, 465); // x, y position of slider
    let reverb_dry_wet_label = createP('0%'); // percentage label
    reverb_dry_wet_label.position(reverb_dry_wet_slider.x + reverb_dry_wet_slider.width - 30, reverb_dry_wet_slider.y - 35); // label position

    // updates label with percentage
    reverb_dry_wet_slider.input(() => {
        reverb_dry_wet_label.html(`${Math.floor((reverb_dry_wet_slider.value() / reverb_dry_wet_slider.elt.max) * 100)}%`);
    });

    text('output', 20, 500); // label, x, y position
    reverb_output_slider = createSlider(1, 24, 1, 0.01); // creates slider with minimum, maximum, starting position and step values
    reverb_output_slider.position(20, 500); // x, y position of slider
    let reverb_output_label = createP('0%'); // percentage label
    reverb_output_label.position(reverb_output_slider.x + reverb_output_slider.width - 30, reverb_output_slider.y - 35); // label position

    // updates label with percentage
    reverb_output_slider.input(() => {
        reverb_output_label.html(`${Math.floor((reverb_output_slider.value() / reverb_output_slider.elt.max) * 100)}%`);
    });

    // reverse button
    reverse_button = createButton('reverse'); // create button
    reverse_button.position(20, 420); // x, y coordinates of button
    reverse_button.id('reverse_button_id'); // button id
}

// updates reverb based on value of sliders
function updateReverb() {
    reverb_filter.set(
        reverb_duration_slider.value(),
        reverb_decay_slider.value(),
        isReversed
    );
    reverb_filter.drywet(reverb_dry_wet_slider.value());
    reverb_filter.amp(reverb_output_slider.value());
}