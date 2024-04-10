let canvas_width = 800;
let canvas_height = 400;
let audio_file;
let play_stop_button;
let progress_bar_slider;
let meyda_analyzer;
let warning_message;
let current_form = 'square';
let rms_qty = 0.0;
let sc_size;
let zcr_stroke_color;
let zcr_rotation = 0;
let default_background_color;
let voice_background_color;
let zcr_stroke_weight;
let previous_spread = 0;
let ellipse_size = 0;
let rms_opacity;
let voice_command;
let amplitude;
let is_setup_finished = false;

// handles initialization of variables
function initializeVariables() {
    default_background_color = color(232, 232, 227); // light grey
    zcr_stroke_weight = 0;
    rms_opacity = 0;
    current_form = 'amp';
}