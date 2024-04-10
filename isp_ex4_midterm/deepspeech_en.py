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
from tabulate import tabulate
from filters_wer_calculation import calculate_word_error_ratio

# DeepSpeech implementation adapted from: https://www.youtube.com/watch?v=LGuCaXw79U4
# https://github.com/mozilla/DeepSpeech
# https://lindevs.com/speech-to-text-using-deepspeech
# https://deepspeech.readthedocs.io/en/r0.9/
# https://reneelin2019.medium.com/video-audio-to-text-with-mozilla-deepspeech-2f7c3b3aef1f

# handles speech recognition for english sound files
def speech_recognition(sound_file, language_model_file):
    fs, sound = wavfile.read(sound_file)
    sound = np.int16(sound)
    deep_speech_model = deepspeech.Model(language_model_file)
    deep_speech_model.enableExternalScorer(model_scorer_file) 
    speech_to_text = deep_speech_model.stt(sound)
    return speech_to_text

# get english model file and assets
# sentence 1 quote by Norman Vincent Peale: https://www.brainyquote.com/quotes/norman_vincent_peale_130593?src=t_inspirational
# sentence 2 quote by Lily Tomlin: https://philosiblog.com/2012/07/09/i-always-wanted-to-be-somebody-but-now-i-realize-i-should-have-been-more-specific/
english_model = {
    'English': ('models/deepspeech/model_english/deepspeech-0.9.3-models.pbmm', 
    [
        ('assets/english/checkin.wav', "Where is the check-in desk?"),
        ('assets/english/parents.wav', "I have lost my parents."),
        ('assets/english/suitcase.wav', "Please, I have lost my suitcase."),
        ('assets/english/what_time.wav', "What time is my plane?"),
        ('assets/english/where.wav', "Where are the restaurants and shops?"),
        ('assets/english/my_sentence1.wav', "Change your thoughts and you change your world."),
        ('assets/english/my_sentence2.wav', "I always wanted to be somebody, but now I realize I should have been more specific.")
    ])
}

# get scorer file for english language
model_scorer_file = "models/deepspeech/model_english/deepspeech-0.9.3-models.scorer"

language = 'English'
language_model_file, files = english_model[language]

# create tables
results_en = [] # results table
expanded_table_en = [] # expanded table has all fields
condensed_table_en = [] # condensed table has selective fields

for sound_file, target_text in files:
    fs, sound = wavfile.read(sound_file)
    
    # text transcription
    transcribed_text = speech_recognition(sound_file, language_model_file)
    
    # calculating WER rating
    en_wer_rating = calculate_word_error_ratio(target_text, transcribed_text, language='English')
    
    # table with 5 columns
    expanded_table_en.append([language, sound_file, target_text, transcribed_text, en_wer_rating])

    # tables with 3 columns
    condensed_table_en.append([language, sound_file, en_wer_rating])

results_en.extend(expanded_table_en)

# handles printing of tables 
def print_en_tables():
    # expanded table 
    headers_expanded = ['Language', 'File', 'Expected Result', 'DeepSpeech Result', 'WER']
    print(tabulate(expanded_table_en, headers=headers_expanded, tablefmt="fancy_grid"))

    # condensed table
    headers_condensed = ['Language', 'File', 'WER']
    print(tabulate(condensed_table_en, headers=headers_condensed, tablefmt="fancy_outline"))

    # average
    wer_rating_en = [float(row[4].replace('%', '')) for row in results_en]
    avg_en = np.mean(wer_rating_en)
    avg_rounded_wer_en = round(avg_en)
    print(f"English WER Average: {avg_rounded_wer_en}%")

if __name__ == '__main__':
    print_en_tables()
    

