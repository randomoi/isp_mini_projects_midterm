function configureMasterVolume() {
    // creates rectangle around sliders
    push();
    fill(240, 252, 252); // light turquise 
    stroke(1); // border thickness
    rect(565, 325, 150, 200); // coordinates and size
    pop();

    // header
    textSize(14); // text size 
    text('master volume', 565, 310); // label, x, y position

    // size of text labels
    textSize(12);

    // master volume level label
    text('level', 630, 350); // label, x, y position
    master_volume_slider = createSlider(0, 1, 1, 0.01); // creates slider with minimum, maximum, starting position and step values
    master_volume_slider.class('vertical-slider'); // rotates slider vertically
    master_volume_slider.position(575, 430); // x, y coordinates
    let master_volume_label = createP('100%'); // label percentage
    master_volume_label.position(master_volume_slider.x + master_volume_slider.width - 75, master_volume_slider.y - 90); // label position

    // updates label with percentage
    master_volume_slider.input(() => {
        master_volume_label.html(`${Math.floor((master_volume_slider.value() / master_volume_slider.elt.max) * 100)}%`);
    });
}

// updates master volume based on value of slider
function updateMasterVolume() {
    master_volume.amp(master_volume_slider.value());
}