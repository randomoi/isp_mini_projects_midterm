function configureSpectrumLabels() {
    textSize(14);
    text('spectrum in', 540, 70); // label, x, y 
    text('spectrum out', 540, 190); // label, x, y
}

// draws in and out spectrums
function drawInOutSpectrums() {
    // rectangles for spectrum
    push();
    fill(240, 252, 252); // light turquise 
    rect(540, 85, 180, 80); // coordinates and size
    rect(540, 200, 180, 80); // coordinates and size
    pop();

    // unprocessed spectrum
    let unprocessed = fft_in.analyze();
    drawSpectrumIn(unprocessed);

    // processed spectrum
    let processed = fft_out.analyze();
    drawSpectrumOut(processed);
}

function setupSpectrum(spectrum, color, y) {
    noStroke();
    fill(color);
    const scale = 0.1; // variable for scaling spectrum bars
    const spectrum_bar_width = width / spectrum.length * 2;
    // adapted code from: https://p5js.org/examples/sound-frequency-spectrum.html
    for (let i = 0; i < spectrum.length; i++) {
        let x = map(i, 0, spectrum.length, 545, width - 60); // maps i to x within specified width
        let h = map(spectrum[i], 0, 255, 0, height * scale); // maps spectrum to bar height 
        rect(x, y - h, spectrum_bar_width, h); // spectrum bar coordinates and size based on above
    }
}

function drawSpectrumIn(spectrum) {
    setupSpectrum(spectrum, color(230, 22, 11), 160); // color redish,  y = 160

}

function drawSpectrumOut(spectrum) {
    setupSpectrum(spectrum, color(68, 61, 191), 275); // color purple,  y = 275
}