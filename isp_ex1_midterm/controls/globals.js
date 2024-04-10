let width = 730; // canvas width
let height = 535; // canvas heigh
let button_color = '#edd3eb'; // light purple
let button_border = '2px solid #6a3073'; // dark purple

// buttons
let pause_button, play_button, stop_button, skip_to_start_button, skip_to_end_button, loop_button, record_button;

// filters
let pass_filter, wave_distortion, dynamic_compressor, reverb_filter, master_volume;

// low-pass, high-pass, band-pass 
let pass_filter_kind = 'lowpass';
let select_pass_filter,
    pass_filter_cutoff_slider,
    pass_filter_resonance_slider,
    pass_filter_dry_wet_slider,
    pass_filter_output_slider;


// dynamic compressor
let dynamic_compressor_attack_slider,
    dynamic_compressor_knee_slider,
    dynamic_compressor_release_slider,
    dynamic_compressor_ratio_slider,
    dynamic_compressor_threshold_slider,
    dynamic_compressor_wet_dry_slider,
    dynamic_compressor_output_slider;

// master volume
let master_volume_slider;

// reverb
let isReversed = false;
let reverb_duration_slider,
    reverb_decay_slider,
    reverb_dry_wet_slider,
    reverb_output_slider,
    reverse_button;

// reverb label used for reset when button is clicked
let reverb_duration_label, reverb_decay_label;

// waveshaper distortion
let wave_distortion_amount_slider,
    wave_distortion_oversample_slider,
    wave_distortion_dry_wet_slider,
    wave_distortion_output_slider;

// delay
let delay_time_slider, delay_echo_slider, delayFilter_slider;

// sound 
let sound_player, sound_recorder, audio_file, microphone;

// spectrum
let fft_in, fft_out;