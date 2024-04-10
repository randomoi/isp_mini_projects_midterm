// creates attributes of circle, rectangle, square, penagon, triangle
function createFormAttributes() {
    strokeWeight(zcr_stroke_weight); // stroke weight with meyda zrc
    if (current_form === 'circle') { // if a circle
        let amplitude_level = amplitude.getLevel(); // get amplitude level
        if (ellipse_size > 0) { // if ellipse is more than 0
            let red = map(amplitude_level, 0, 1, 255, 0); // create red using map and amplitude
            let green = map(amplitude_level, 0, 1, 255, 255); // create green using map and amplitude
            fill(red, green, 0, rms_opacity); // color ellipse with color based on following condition
        } else {
            // if amplitude is 0.5 color ellipse with red
            if (Math.abs(amplitude_level - 0.5) < 0.05) {
                fill(255, 0, 0, rms_opacity);
            } else {
                // otherwise color with yellow (default color)
                fill(255, 255, 0, rms_opacity);
            }
        }

    } else {
        if (current_form === 'rectangle') { // if rectangle
            // created variables for better readability 
            let rectangle_min_opacity = 200;
            let rectangle_max_opacity = 100;
            let rectangle_opacity = map(rms_opacity, 0, 255, rectangle_min_opacity, rectangle_max_opacity);
            fill(rectangle_opacity, 0, rectangle_opacity, rms_opacity); // fill with purple color
        } else if (current_form === 'square') { // if square
            let square_blue_color = [0, 0, sr_form_color]; // blue color
            fill(square_blue_color[0], square_blue_color[1], square_blue_color[2], rms_opacity * 2);
        } else if (current_form === 'triangle') {
            // created variables for better readability 
            let triangle_min_red = 0;
            let triangle_max_red = 100;
            let triangle_red = map(ss_size_form, 0, ss_size_form, triangle_min_red, triangle_max_red);
            let triangle_min_green = 100;
            let triangle_max_green = 255;
            let triangle_green = map(ss_size_form, 0, ss_size_form, triangle_min_green, triangle_max_green);
            fill(triangle_red, triangle_green, 255); // turquise color
        } else if (current_form === 'pentagon') {
            // created variables for better readability 
            let pentagon_min_red = 0;
            let pentagon_max_red = 100;
            let pentagon_red = map(rms_opacity, 0, 255, pentagon_min_red, pentagon_max_red);
            let pentagon_min_green = 100;
            let pentagon_max_green = 200;
            let pentagon_green = map(rms_opacity, 0, 255, pentagon_min_green, pentagon_max_green);
            let pentagon_min_blue = 0;
            let pentagon_max_blue = 100;
            let pentagon_blue = map(rms_opacity, 0, 255, pentagon_min_blue, pentagon_max_blue);
            fill(pentagon_red, pentagon_green, pentagon_blue, rms_opacity); // green color
        }
    }
    stroke(0, zcr_stroke_color, 0, rms_opacity); // green stroke
}

// https://p5js.org/reference/#group-Shape
// https://p5js.org/reference/#/p5.Amplitude/getLevel
// https://p5js.org/reference/#/p5/beginShape
// https://p5js.org/reference/#/p5/endShape
// https://p5js.org/reference/#/p5/vertex
// suppose to change form based on amplitude, but I didnt get it to work once I added speech
function drawForms() {
    createFormAttributes();
    if (current_form === 'amp') {
        let amplitude_level = amplitude.getLevel(); // assigning amplitude level
        // change form based on amp level 
        if (amplitude_level >= 0.4) { // if >= 0.4 set it to pentagon
            current_form = 'pentagon';
        } else if (amplitude_level >= 0.3) { // if >= 0.3 set it to circles
            current_form = 'circle';
        } else if (amplitude_level >= 0.2) { // if >= 0.2 set it to square
            current_form = 'square';
        } else if (amplitude_level >= 0.1) { // if >= 0.1 set it to triangle
            current_form = 'triangle';
        } else {
            current_form = 'rectangle'; // otherwise set it to rectangle
        }
    }
    // draws form based on the selection 
    if (current_form === 'rectangle') {
        rotate(zcr_rotation); // roate using mayda rotation
        for (let i = 0; i < rms_qty; i++) {
            let width = random(sc_size, sc_size * 4);
            let height = random(sc_size, sc_size * 1.5);
            rect(random(60, 700), random(40, 310), width, height); // draws in random locations 
        }
    } else if (current_form === 'square') {
        for (let i = 0; i < rms_qty; i++) {
            rect(random(40, 700), random(40, 310), sc_size); // draws in random locations 
        }
    } else if (current_form === 'triangle') {
        for (let i = 0; i < rms_qty; i++) {
            triangle( // draws in random locations 
                random(40, 700),
                random(40, 310),
                random(40, 700),
                random(40, 310),
                random(40, 700),
                random(40, 310)
            );
        }
    } else if (current_form === 'circle') {
        for (let i = 0; i < rms_qty; i++) {
            ellipse(random(50, 650), random(50, 300), sc_size); // draws in random locations
        }
    } else if (current_form === 'pentagon') {
        for (let i = 0; i < rms_qty; i++) {
            let x_coordinate = random(40, 700);
            let y_coordinate = random(60, 290);

            // draws pentagon 
            beginShape();
            vertex(x_coordinate, y_coordinate - 50);
            vertex(x_coordinate + 60, y_coordinate - 20);
            vertex(x_coordinate + 40, y_coordinate + 50);
            vertex(x_coordinate - 40, y_coordinate + 50);
            vertex(x_coordinate - 60, y_coordinate - 20);
            endShape(CLOSE);
        }
    }
}

// used by speech to display selected form
function displayForm() {
    if (current_form === 'square') { // if square 
        rect(220, 220, 220, 220); // x, y, w, h
    } else if (current_form === 'triangle') { // if triangle
        triangle(210, 150, 150, 310, 310, 310);
    } else if (current_form === 'circle') { // if circle
        ellipse(220, 220, 220, 220); // x1, y1, x2, y2, x3, y3
    } else if (current_form === 'pentagon') {
        beginShape();
        vertex(250, 70);
        vertex(400, 170);
        vertex(350, 320);
        vertex(150, 330);
        vertex(120, 170);
        endShape(CLOSE);
    } else if (current_form === 'rectangle') {
        rect(120, 120, 320, 200); // x, y, w, h
    }
}

// handles form switching based on voice command
function switchForm(form) {
    if (form === 'rectangle') { // if command rectangle change to rectangle
        current_form = 'rectangle';
    } else if (form === 'triangle') { // if command triangle change to triangle
        current_form = 'triangle';
    } else if (form === 'circle') { // if command circle change to circle
        current_form = 'circle';
    } else if (form === 'pentagon') { // if command pentagon change to pentagon
        current_form = 'pentagon';
    } else if (form === 'square') { // if command square change to square
        current_form = 'square';
    }
}


// https://p5js.org/reference/#/p5/map
// helper function for range using map()
function setMapRange(value, input_min, input_max, output_min, output_max) {
    return map(value, input_min, input_max, output_min, output_max);
}

// https://meyda.js.org/audio-features#rms
// updates qty of forms by using "root mean square", RMS uses float as per documentation
// used by all forms
function updateFormQTY(effect) {
    let scale = 25;
    let min_qty = 0.0;
    let max_qty = 7.0;
    rms_qty = constrain(effect.rms * scale, min_qty, max_qty);
}

// https://meyda.js.org/audio-features#rms
// updates opacity of forms by using "root mean square". RMS uses float as per documentation but opacity is reprecented 
// as int 0-255 therefore used int
// used by all forms except triangles
function updateFormOpacity(effect) {
    let rms_min = 0;
    let rms_max = 1;
    let min_opacity = 150;
    let max_opacity = 255;
    let threshold = 100;
    opacity = setMapRange(effect.rms, rms_min, rms_max, min_opacity, max_opacity);

    rms_opacity = Math.min(opacity, threshold); // clamps opacity to max threshold
}

// https://meyda.js.org/audio-features#spectralcentroid
// updates size of form by using "spectral centroid", which is balance point of spectrum
// used by rectangle, squares and circles
function updateFormSize(effect) {
    let sc_fft_min = 0;
    let sc_fft_max = buffer_size / 60;
    let min_size = 1;
    let max_size = 20;
    sc_size = setMapRange(effect.spectralCentroid, sc_fft_min, sc_fft_max, min_size, max_size);
}

let sample_rate = 44100;
// https://meyda.js.org/audio-features#spectralrolloff
// updates color of forms by using "spectral rolloff"
// used by squares
function updateFormColor(effect) {
    let sr_min_freq = 0;
    let sr_max_freq = sample_rate / 2;
    let min_value = 0;
    let max_value = 255;
    sr_form_color = setMapRange(effect.spectralRolloff, sr_min_freq, sr_max_freq, min_value, max_value);
}

// https://meyda.js.org/audio-features#spectralspread
// updates size of triangles by using "spectral spread" 
// used by triangles
function updateFormSpectralSpreadSize(effect) {
    let ss_fft_min = 0;
    let ss_fft_max = buffer_size / 2;
    let min_spread = 5;
    let max_spread = 10;
    ss_size_form = setMapRange(effect.spectralSpread, ss_fft_min, ss_fft_max, min_spread, max_spread);
}

let buffer_size = 512;
// https://meyda.js.org/audio-features#zcr
// updates stroke weight of forms by using "zero crossing rate" 
// used by all forms
function updateFormStrokeWeight(effect) {
    let zcr_min_value = 0;
    let zcr_max_value = (buffer_size / 2) - 1;
    let min_stroke_weight = 0;
    let max_stroke_weight = 60;
    zcr_stroke_weight = setMapRange(effect.zcr, zcr_min_value, zcr_max_value, min_stroke_weight, max_stroke_weight);
}

// updates stroke color of forms by using "zero crossing rate" 
// used by all forms
function updateFormStrokeColor(effect) {
    let zcr_min = 0;
    let zcr_max = (buffer_size / 3) - 1;
    let min_color = 0;
    let max_color = 255;
    zcr_stroke_color = map(effect.zcr, zcr_min, zcr_max, min_color, max_color);
}

// updates rotation of forms by using "zero crossing rate" (only used for rectangle)
// used by rectangles
function updateFormRotation(effect) {
    let zcr_min_rotation = 0;
    let zcr_max_rotation = (buffer_size / 2) - 1;
    let min_rotation = -PI / 16;
    let max_rotation = PI;
    zcr_rotation = setMapRange(effect.zcr, zcr_min_rotation, zcr_max_rotation, min_rotation, max_rotation);
}

// calls all update functions
function updateVisualEffects(effect) {
    updateFormQTY(effect);
    updateFormSize(effect);
    updateFormColor(effect);
    updateFormStrokeWeight(effect);
    updateFormStrokeColor(effect);
    updateFormOpacity(effect);
    updateFormRotation(effect);
    updateFormSpectralSpreadSize(effect);
}