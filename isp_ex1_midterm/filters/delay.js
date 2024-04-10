// https://p5js.org/reference/#/p5/push
// https://p5js.org/reference/#/p5/fill
// https://p5js.org/reference/#/p5/stroke
// https://p5js.org/reference/#/p5/rect
// https://p5js.org/reference/#/p5/pop
// https://p5js.org/reference/#/p5/textSize
// https://p5js.org/reference/#/p5/text
// https://p5js.org/reference/#/p5/createSlider
// https://p5js.org/reference/#/p5/input
// configures delay filter
function configureDelay() {
    // creates rectangle around sliders
    push();
    fill(240, 252, 252); // light turquise 
    stroke(1); // boarder thickness
    rect(380, 325, 150, 200); // coordinates and size
    pop();

    // header
    textSize(14); // text size 
    text('delay', 380, 310); // label, x, y position

    // size of text labels
    textSize(12);

    // https://p5js.org/reference/#/p5.Delay
    // time slider
    text('time', 395, 350); // label, x, y position
    delay_time_slider = createSlider(0, 1, 0, 0.01); // creates slider with minimum, maximum, starting position and step values
    delay_time_slider.class('vertical-slider'); // rotates slider vertically
    delay_time_slider.position(340, 430); // x, y position of slider
    let delay_time_label = createP('0%'); // percentage label
    delay_time_label.position(delay_time_slider.x + 60, delay_time_slider.y + delay_time_slider.height - 105); // label position

    // updates label with percentage
    delay_time_slider.input(() => {
        delay_time_label.html(`${Math.floor((delay_time_slider.value() / delay_time_slider.elt.max) * 100)}%`);
    });

    // feedback slider
    text('echo', 440, 350); // label, x, y position
    delay_echo_slider = createSlider(0, 0.75, 0.1, 0.01); // creates slider with minimum, maximum, starting position and step values
    delay_echo_slider.class('vertical-slider'); // rotates slider vertically
    delay_echo_slider.position(390, 430); // x, y position of slider
    let delay_echo_label = createP('10%'); // percentage label
    delay_echo_label.position(delay_echo_slider.x + 55, delay_echo_slider.y + delay_echo_slider.height - 105); // label position

    // updates label with percentage
    delay_echo_slider.input(() => {
        delay_echo_label.html(`${Math.floor((delay_echo_slider.value() / delay_echo_slider.elt.max) * 100)}%`);
    });

    // output slider
    text('output', 485, 350); // label, x, y position
    delay_output_slider = createSlider(1, 24, 24, 0.01); // creates slider with minimum, maximum, starting position and step values
    delay_output_slider.class('vertical-slider'); // rotates slider vertically
    delay_output_slider.position(440, 430); // x, y position of slider

    let delay_output_label = createP('100%'); // percentage label
    delay_output_label.position(delay_output_slider.x + 50, delay_output_slider.y + delay_output_slider.height - 105); // label position

    // updates label with percentage
    delay_output_slider.input(() => {
        delay_output_label.html(`${Math.floor((delay_output_slider.value() / delay_output_slider.elt.max) * 100)}%`);
    });
}


// https://p5js.org/reference/#/p5.Delay/delayTime
// https://p5js.org/reference/#/p5.Delay/feedback
// https://p5js.org/reference/#/p5.Effect/amp
// updates delay based on the value of sliders
function updateDelay() {
    delay_filter.delayTime(delay_time_slider.value());
    delay_filter.feedback(delay_echo_slider.value());
    delay_filter.amp(delay_output_slider.value());
}