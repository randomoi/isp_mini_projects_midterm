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
from scipy.io import wavfile
import numpy as np
import noisereduce as nr
from filters_wer_calculation import create_low_pass_filter, create_band_pass_filter, create_high_pass_filter, create_preemphasis, detect_voice_activity, calculate_word_error_ratio
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


# get spanish model file and assets
spanish_model = {
    'Spanish': ('models/deepspeech/model_spanish/output_graph_es.pbmm', 
    [
        ('assets/spanish/checkin_es.wav', "¿Dónde están los mostradores?"),
        ('assets/spanish/parents_es.wav', "He perdido a mis padres."),
        ('assets/spanish/suitcase_es.wav', "Por favor, he perdido mi maleta."),
        ('assets/spanish/what_time_es.wav', "¿A qué hora es mi avión?"),
        ('assets/spanish/where_es.wav', "¿Dónde están los restaurantes y las tiendas?")
    ])
}

# get scorer file for spanish language
model_scorer_file = "models/deepspeech/model_spanish/kenlm_es.scorer"
language = 'Spanish'
language_model_file, files = spanish_model[language]
deep_speech_model = deepspeech.Model(language_model_file)
deep_speech_model.enableExternalScorer(model_scorer_file)  

# settings
noise_setting = {'Spanish': {
                            'language': 'spanish', 
                            'ftt_size': 1024, 
                            'frame_step_size': 128}
}

cutoff_setting = {'Spanish': {
                            'cutoff_freq': 7999}
}

# create tables
results_es = [] # results table
expanded_table_es = [] # expanded table has all fields
condensed_table_es = [] # condensed table has selective fields

for sound_file, target_text in files:
    fs, sound = wavfile.read(sound_file)

    sound = create_low_pass_filter(sound, cutoff=7999, fs=fs)
    sound = create_band_pass_filter(sound, lowcut=250, highcut=4000, fs=fs) 
    sound = create_high_pass_filter(sound, cutoff=40, fs=fs)  
    sound = reduce_noise(sound, language)

    emphasis_factor = 0.05  
    sound = create_preemphasis(sound, emphasis_factor)
    
    voice_activity_threshold = 10  
    sound = detect_voice_activity(sound, voice_activity_threshold)

    sound = np.int16(sound)
    
    # text transcription
    transcribed_text = deep_speech_model.stt(sound)
   
    # calculating WER rating
    es_wer_rating = calculate_word_error_ratio(target_text, transcribed_text, language='Spanish')
    
    # table with 5 columns
    expanded_table_es.append([language, sound_file, target_text, transcribed_text, es_wer_rating])

    # tables with 3 columns
    condensed_table_es.append([language, sound_file, es_wer_rating])

results_es.extend(expanded_table_es)

# handles printing of tables 
def print_es_tables():
    # expanded table 
    headers_expanded = ['Language', 'File', 'Expected Result', 'DeepSpeech Result', 'WER']
    print(tabulate(expanded_table_es, headers=headers_expanded, tablefmt="fancy_grid"))

    # condensed table
    headers_condensed = ['Language', 'File', 'WER']
    print(tabulate(condensed_table_es, headers=headers_condensed, tablefmt="fancy_outline"))

    # average
    wer_rating_es = [float(row[4].replace('%', '')) for row in results_es]
    avg_es = np.mean(wer_rating_es)
    avg_rounded_wer_es = round(avg_es)
    print(f"Spanish WER Average: {avg_rounded_wer_es}%")

if __name__ == '__main__':
    print_es_tables()
    



