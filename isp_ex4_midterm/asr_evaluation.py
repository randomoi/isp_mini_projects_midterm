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
from google.cloud import speech
from pocketsphinx import LiveSpeech
import numpy as np
from scipy.io import wavfile
import wave
from filters_wer_calculation import  calculate_word_error_ratio
from tabulate import tabulate

# deepSpeech implementation adapted from: https://www.youtube.com/watch?v=LGuCaXw79U4
# https://github.com/mozilla/DeepSpeech
# https://lindevs.com/speech-to-text-using-deepspeech
# https://deepspeech.readthedocs.io/en/r0.9/
# https://reneelin2019.medium.com/video-audio-to-text-with-mozilla-deepspeech-2f7c3b3aef1f

deepspeech_model_scorer_file = "models/deepspeech/model_english/deepspeech-0.9.3-models.scorer"

# handles speech recognition with Deep Speech for english sound files
def speech_recognition_deepspeech(sound_file, deepspeech_language_model_file):
    fs, sound = wavfile.read(sound_file)
    sound = np.int16(sound)
    deep_speech_model = deepspeech.Model(deepspeech_language_model_file)
    deep_speech_model.enableExternalScorer(deepspeech_model_scorer_file) 
    speech_to_text = deep_speech_model.stt(sound)
    return speech_to_text

# google ASR implementation was adapted from the following resources:
# https://st-yuri.medium.com/set-up-and-use-speech-to-text-api-in-python-78f1a0be167e
# https://medium.com/codex/google-speech-to-text-api-tutorial-with-python-2e049ae3f525
# https://pypi.org/project/google-cloud-speech/
# https://www.youtube.com/watch?v=izdDHVLc_Z0

# handles speech recognition with Google API for english sound files
def speech_recognition_google(sound_file):
    speech_client = speech.SpeechClient.from_service_account_json('models/google/my-project-isp-390411-fe701b6ba9c9.json')

    with open(sound_file, 'rb') as file:
        sound_data = file.read()

    sound = speech.RecognitionAudio(content=sound_data)
    configuration = speech.RecognitionConfig(language_code='en-US')
    recognition = speech_client.recognize(config=configuration, audio=sound)
    speech_to_text = recognition.results[0].alternatives[0].transcript
    return speech_to_text

# pocketSphinx ASR implementation was adapted from the following resources:
# https://pypi.org/project/pocketsphinx/#:~:text=This%20is%20an%20iterator%20class,%3E%20%22go%20forward%20ten%20meters%22

pocketsphinx_model_scorer_file = 'models/pocketsphinx/en-70k-0.1.lm'

# handles speech recognition with PocketSphinx for english sound files
def speech_recognition_pocketsphinx(sound_file):

    with wave.open(sound_file, 'rb') as wf:
        live_speech = LiveSpeech(lm=pocketsphinx_model_scorer_file)

        # sound source setup
        live_speech.start_utt()
        while True:
            buf = wf.readframes(1024)
            if buf:
                live_speech.process_raw(buf, False, False)
            else:
                break
        live_speech.end_utt()

        speech_to_text = live_speech.hyp().hypstr
    return speech_to_text

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

results_en = []
expanded_table_deepspeech = [] # expanded table has all fields
expanded_table_google = [] # expanded table has all fields
expanded_table_pocketsphinx = [] # expanded table has all fields
list = list(english_model.keys())

for language in list:
    deepspeech_language_model_file, files = english_model[language]
    asr_results = []

    for sound_file, target_text in files:
        fs, audio = wavfile.read(sound_file)

        deepspeech_transcribed_text = speech_recognition_deepspeech(sound_file, deepspeech_language_model_file)
        deepspeech_wer_rating = calculate_word_error_ratio(target_text, deepspeech_transcribed_text, language='English')
        
        # table with 5 columns
        expanded_table_deepspeech.append([language, sound_file, target_text, deepspeech_transcribed_text, deepspeech_wer_rating])

        google_transcribed_text = speech_recognition_google(sound_file)
        google_wer_rating = calculate_word_error_ratio(target_text, google_transcribed_text, language='English')
        
        # table with 5 columns
        expanded_table_google.append([language, sound_file, target_text, google_transcribed_text, google_wer_rating])

        pocketsphinx_transcribed_text = speech_recognition_pocketsphinx(sound_file)
        pocketsphinx_wer_rating = calculate_word_error_ratio(target_text, pocketsphinx_transcribed_text, language='English')

        # table with 5 columns
        expanded_table_pocketsphinx.append([language, sound_file, target_text, pocketsphinx_transcribed_text, pocketsphinx_wer_rating])

        asr_results.append([language, sound_file, deepspeech_wer_rating, google_wer_rating, pocketsphinx_wer_rating])

    results_en.extend(asr_results)


# handles printing of table and average calculation
def print_asr_comparison():
    print('--------------------') # separator
    print('Expanded DeepSpeech Table') # title
    # expanded deepspeech table 
    headers_expanded_deepspeech = ['Language', 'File', 'Expected Result', 'DeepSpeech Result', 'WER']
    print(tabulate(expanded_table_deepspeech, headers=headers_expanded_deepspeech, tablefmt="fancy_grid"))

    print('--------------------') # separator
    print('Expanded Google Cloud STT Table') # title
    # expanded google table 
    headers_expanded_google = ['Language', 'File', 'Expected Result', 'Google Result', 'WER']
    print(tabulate(expanded_table_google, headers=headers_expanded_google, tablefmt="fancy_grid"))

    print('--------------------') # separator
    print('Expanded PocketSphinx Table') # title
    # expanded pocketsphinx table 
    headers_expanded_pocketsphinx = ['Language', 'File', 'Expected Result', 'PocketSphinx Result', 'WER']
    print(tabulate(expanded_table_pocketsphinx, headers=headers_expanded_pocketsphinx, tablefmt="fancy_grid"))

    print('--------------------') # separator
    print('ASR Models Comparison') # title
    # table with WER results
    headers_all = ['Language', 'File', 'DeepSpeech - WER', 'Google - WER', 'PocketSphinx - WER']
    print(tabulate(results_en, headers=headers_all, tablefmt='fancy_grid'))

    # average WER calculation for DeepSpeech 
    wer_rating_deepspeech = [float(row[2].replace('%', '')) for row in results_en]
    deepspeech_wer_mean = np.mean(wer_rating_deepspeech)
    deepspeech_avg_wer = round(deepspeech_wer_mean)

    # average WER calculation for Google
    wer_rating_google = [float(row[3].replace('%', '')) for row in results_en]
    google_wer_mean  = np.mean(wer_rating_google)
    google_avg_wer = round(google_wer_mean)

    # average WER calculation for PocketSphinx
    wer_rating_pocketsphinx = [float(row[4].replace('%', '')) for row in results_en]
    pocketsphinx_wer_mean = np.mean(wer_rating_pocketsphinx)
    pocketsphinx_avg_wer = round(pocketsphinx_wer_mean)

    # create AVG table for all languages 
    print('ASR Average Comparison') # title
    avg_list = [['DeepSpeech', f"{deepspeech_avg_wer}%"], ['Google', f"{google_avg_wer}%"], ['PocketSphinx', f"{pocketsphinx_avg_wer}%"]]
    avg_headers = ['ASR', 'WER (AVG)']
    avg_wer_table_all_models = tabulate(avg_list, avg_headers, tablefmt='heavy_outline')
    print(avg_wer_table_all_models)

if __name__ == '__main__':
    print_asr_comparison()
    
