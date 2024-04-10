# CODE COMMENTS:
# Dear Tutor:
# Please kindly note that code was written based on guidance from documentation, 
# anything that was used outside of documentation is marked as “..adapted from XXXX…” 
# the code provided by university is not explicitly indicated. I have been working on 
# these projects from the beginning of the semester. During the development process, 
# I used guidance provided by the University from my first Level 4 semester, where 
# students were instructed to explicitly indicate which code was copied or adapted 
# from outside resources and provide links to that code. I did exactly as it was 
# taught to me from Level 4. I believe it’s unreasonable to provide early access 
# to Midterm Instructions and months later change guidance on how the code is referenced. 
# As you can see, I wrote a lot of code and I used separation of concerns to write my code, 
# which yields to a lot of code. I’m unable to go back months later and specify how each piece 
# of code was written. I do not have photographic memory or even a good memory, that’s why 
# write comments when I write code. I’m taking 3 project modules this semester. I’m extremely 
# overwhelmed with the amount of work each module demands. I can assure you that for the next 
# set of projects due for the final exam/coursework, I will explicitly comment code as per new 
# University requirements. 
# Thank you.

import deepspeech
import numpy as np
from scipy.io import wavfile
import noisereduce as nr
from tabulate import tabulate
from filters_wer_calculation import  create_low_pass_filter, create_preemphasis, change_volume, detect_voice_activity, calculate_word_error_ratio
import noisereduce as nr
from tabulate import tabulate

# DeepSpeech implementation adapted from: https://www.youtube.com/watch?v=LGuCaXw79U4
# https://github.com/mozilla/DeepSpeech
# https://lindevs.com/speech-to-text-using-deepspeech
# https://deepspeech.readthedocs.io/en/r0.9/
# https://reneelin2019.medium.com/video-audio-to-text-with-mozilla-deepspeech-2f7c3b3aef1f

# handles noise reduction 
def reduce_noise(sound, language):
    ftt_size = noise_setting[language]['ftt_size']
    frame_step_size = noise_setting[language]['frame_step_size']
    cutoff_freq = cutoff_setting[language]['cutoff_freq']
    noise_reduction = nr.reduce_noise(sound, n_fft=ftt_size, hop_length=frame_step_size, sr=fs)
    cleaned_sound = create_low_pass_filter(noise_reduction, cutoff=cutoff_freq, fs=fs)
    return cleaned_sound


# get italian model file and assets
italian_model = {
    'Italian': ('models/deepspeech/model_italian/output_graph_it.pbmm', 
    [
        ('assets/italian/checkin_it.wav', "Dove e' il bancone?"),
        ('assets/italian/parents_it.wav', "Ho perso i miei genitori."),
        ('assets/italian/suitcase_it.wav', "Per favore, ho perso la mia valigia."),
        ('assets/italian/what_time_it.wav', "A che ora e’ il mio aereo?"),
        ('assets/italian/where_it.wav', "Dove sono i ristoranti e i negozi?")
    ])
}

# get scorer file for italian language
model_scorer_file = "models/deepspeech/model_italian/kenlm_it.scorer"
language = 'Italian'
language_model_file, files = italian_model[language]
deep_speech_model = deepspeech.Model(language_model_file)
deep_speech_model.enableExternalScorer(model_scorer_file)  

# settings
noise_setting = {'Italian': {
                            'language': 'italian', 
                            'ftt_size': 2048, 
                            'frame_step_size': 512}
}

cutoff_setting = {'Italian': {
                            'cutoff_freq': 7000}
}

# create tables
results_it = [] # results table
expanded_table_it = [] # expanded table has all fields
condensed_table_it = [] # condensed table has selective fields

for sound_file, target_text in files:
    fs, sound = wavfile.read(sound_file)

    sound = create_low_pass_filter(sound, cutoff=5200, fs=fs)
    sound = reduce_noise(sound, language)

    emphasis_factor = 3.1 
    sound = create_preemphasis(sound, emphasis_factor)

    voice_activity_threshold = 10  
    sound = detect_voice_activity(sound, voice_activity_threshold)

    sound = change_volume(sound, volume = 1.2)
    
    sound = np.int16(sound)
    
    # text transcription
    transcribed_text = deep_speech_model.stt(sound)
    
    # calculating WER rating
    it_wer_rating = calculate_word_error_ratio(target_text, transcribed_text, language='Italian')
 
    # table with 5 columns
    expanded_table_it.append([language, sound_file, target_text, transcribed_text, it_wer_rating])

    # tables with 3 columns
    condensed_table_it.append([language, sound_file, it_wer_rating])

results_it.extend(expanded_table_it)

# handles printing of tables 
def print_it_tables():
    # expanded table 
    headers_expanded = ['Language', 'File', 'Expected Result', 'DeepSpeech Result', 'WER']
    print(tabulate(expanded_table_it, headers=headers_expanded, tablefmt="fancy_grid"))

    # condensed table
    headers_condensed = ['Language', 'File', 'WER']
    print(tabulate(condensed_table_it, headers=headers_condensed, tablefmt="fancy_outline"))

    # average
    wer_rating_it = [float(row[4].replace('%', '')) for row in results_it]
    avg_it = np.mean(wer_rating_it)
    avg_rounded_wer_it = round(avg_it)
    print(f"Italian WER Average: {avg_rounded_wer_it}%")

if __name__ == '__main__':
    print_it_tables()
    

