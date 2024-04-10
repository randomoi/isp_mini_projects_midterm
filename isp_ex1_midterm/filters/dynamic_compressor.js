function configureDynamicCompressor() {
    // creates rectangle around sliders
    push();
    fill(240, 252, 252); // light turquise 
    stroke(1); // boarder thickness
    rect(195, 85, 300, 195); // coordinates and size
    pop();

    // header 
    textSize(14); // text size
    text('dynamic compressor', 195, 70); // label, x, y position

    // text size for labels
    textSize(12);

    // attack slider
    // https://p5js.org/reference/#/p5.Compressor/attack
    text('attack', 205, 110); // label, x, y position
    dynamic_compressor_attack_slider = createSlider(0, 1, 0.003, 0.01); // creates slider with minimum, maximum, starting position and step values
    dynamic_compressor_attack_slider.position(200, 115); // x, y position of slider
    let dynamic_compressor_attack_label = createP('0%'); // percentage label
    dynamic_compressor_attack_label.position(dynamic_compressor_attack_slider.x + dynamic_compressor_attack_slider.width - 30, dynamic_compressor_attack_slider.y - 35);

    // updates label with percentage
    dynamic_compressor_attack_slider.input(() => {
        dynamic_compressor_attack_label.html(`${Math.floor((dynamic_compressor_attack_slider.value() / dynamic_compressor_attack_slider.elt.max) * 100)}%`);
    });

    // knee slider
    // https://p5js.org/reference/#/p5.Compressor/knee
    // https://developer.mozilla.org/en-US/docs/Web/API/DynamicsCompressorNode
    text('knee', 205, 155); // label, x, y position
    dynamic_compressor_knee_slider = createSlider(0, 40, 30, 1); // creates slider with minimum, maximum, starting position and step values
    dynamic_compressor_knee_slider.position(200, 160); // x, y position of slider
    let dynamic_compressor_knee_label = createP('75%'); // percentage label
    dynamic_compressor_knee_label.position(dynamic_compressor_knee_slider.x + dynamic_compressor_knee_slider.width - 30, dynamic_compressor_knee_slider.y - 35);

    // updates label with percentage
    dynamic_compressor_knee_slider.input(() => {
        dynamic_compressor_knee_label.html(`${Math.floor((dynamic_compressor_knee_slider.value() / dynamic_compressor_knee_slider.elt.max) * 100)}%`);
    });

    // release slider
    // https://p5js.org/reference/#/p5.Env
    // https://p5js.org/reference/#/p5.Env/setADSR
    // https://p5js.org/reference/#/p5.Compressor/release
    // https://p5js.org/reference/#/p5.Compressor
    text('release', 205, 200); // label, x, y position
    dynamic_compressor_release_slider = createSlider(0, 1, 0.25, 0.01); // creates slider with minimum, maximum, starting position and step values
    dynamic_compressor_release_slider.position(200, 205); // x, y position of slider
    let dynamic_compressor_release_label = createP('25%'); // percentage label
    dynamic_compressor_release_label.position(dynamic_compressor_release_slider.x + dynamic_compressor_release_slider.width - 30, dynamic_compressor_release_slider.y - 35); // label position

    // updates label with percentage
    dynamic_compressor_release_slider.input(() => {
        dynamic_compressor_release_label.html(`${Math.floor((dynamic_compressor_release_slider.value() / dynamic_compressor_release_slider.elt.max) * 100)}%`);
    });

    // ratio slider
    // https://p5js.org/reference/#/p5.Compressor/ratio
    text('ratio', 205, 245); // label, x, y position
    dynamic_compressor_ratio_slider = createSlider(1, 20, 12, 1); // creates slider with minimum, maximum, starting position and step values
    dynamic_compressor_ratio_slider.position(200, 250); // x, y position of slider
    let dynamic_compressor_ratio_label = createP('60%'); // percentage label
    dynamic_compressor_ratio_label.position(dynamic_compressor_ratio_slider.x + dynamic_compressor_ratio_slider.width - 30, dynamic_compressor_ratio_slider.y - 35); // label position

    // updates label with percentage
    dynamic_compressor_ratio_slider.input(() => {
        dynamic_compressor_ratio_label.html(`${Math.floor((dynamic_compressor_ratio_slider.value() / dynamic_compressor_ratio_slider.elt.max) * 100)}%`);
    });

    // threshold slider
    // https://p5js.org/reference/#/p5.Compressor/threshold
    text('threshold', 345, 110); // label, x, y position
    dynamic_compressor_threshold_slider = createSlider(-100, 0, 0, 1); // creates slider with minimum, maximum, starting position and step values
    dynamic_compressor_threshold_slider.class('vertical-slider'); // rotates slider 
    dynamic_compressor_threshold_slider.position(305, 185); // x, y position of slider
    let dynamic_compressor_threshold_label = createP('0%'); // percentage label
    dynamic_compressor_threshold_label.position(dynamic_compressor_threshold_slider.x + 55, dynamic_compressor_threshold_slider.y + dynamic_compressor_threshold_slider.height - 105); // label position

    // updates label with percentage
    dynamic_compressor_threshold_slider.input(() => {
        dynamic_compressor_threshold_label.html(`${dynamic_compressor_threshold_slider.value()}%`);
    });


    // dry/wet slider
    text('dry/wet', 405, 110); // label, x, y position
    dynamic_compressor_wet_dry_slider = createSlider(0, 1, 0, 0.01); // creates slider with minimum, maximum, starting position and step values
    dynamic_compressor_wet_dry_slider.class('vertical-slider'); // rotates slider 
    dynamic_compressor_wet_dry_slider.position(355, 185); // x, y position of slider
    let dynamic_compressor_wet_dry_label = createP('0%'); // percentage label
    dynamic_compressor_wet_dry_label.position(dynamic_compressor_wet_dry_slider.x + 55, dynamic_compressor_wet_dry_slider.y + dynamic_compressor_wet_dry_slider.height - 105); // label position

    // updates label with percentage
    dynamic_compressor_wet_dry_slider.input(() => {
        dynamic_compressor_wet_dry_label.html(`${Math.floor((dynamic_compressor_wet_dry_slider.value() / dynamic_compressor_wet_dry_slider.elt.max) * 100)}%`);
    });
    // output slider
    // https://developer.mozilla.org/en-US/docs/Web/API/GainNode
    text('output', 455, 110); // label, x, y position
    dynamic_compressor_output_slider = createSlider(1, 24, 1, 0.01); // creates slider with minimum, maximum, starting position and step values
    dynamic_compressor_output_slider.class('vertical-slider'); // rotates slider 
    dynamic_compressor_output_slider.position(405, 185); // x, y position of slider
    let dynamic_compressor_output_label = createP('100%'); // percentage label
    dynamic_compressor_output_label.position(dynamic_compressor_output_slider.x + 50, dynamic_compressor_output_slider.y + dynamic_compressor_output_slider.height - 105); // label position

    // updates label with percentage
    dynamic_compressor_output_slider.input(() => {
        dynamic_compressor_output_label.html(`${Math.floor((dynamic_compressor_output_slider .value() / dynamic_compressor_output_slider .elt.max) * 100)}%`);
    });
}


// updates Dynamic Compressor based on the value of sliders
function updateDynamicCompressor() {
    dynamic_compressor.set(
        dynamic_compressor_attack_slider.value(),
        dynamic_compressor_knee_slider.value(),
        dynamic_compressor_ratio_slider.value(),
        dynamic_compressor_threshold_slider.value(),
        dynamic_compressor_release_slider.value()
    );
    dynamic_compressor.drywet(dynamic_compressor_wet_dry_slider.value());
    dynamic_compressor.amp(dynamic_compressor_output_slider.value());
}