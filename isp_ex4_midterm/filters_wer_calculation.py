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

import numpy as np
from scipy.signal import butter, lfilter
import string

# filter code adapted from: https://devpress.csdn.net/python/62fd1cc27e66823466191645.html
def create_low_pass_filter(data, cutoff, fs, order=2):
    nyquist_freq = 0.5 * fs
    normalized_cutoff_freq = cutoff / nyquist_freq
    butterworth = 'low'
    numerator_coefficient, denominator_coefficient = butter(order, normalized_cutoff_freq, btype = butterworth, analog=False)
    filter_output = lfilter(numerator_coefficient, denominator_coefficient, data)
    return filter_output

# filter code adapted from: https://scipy-cookbook.readthedocs.io/items/ButterworthBandpass.html
# https://www.programcreek.com/python/example/59508/scipy.signal.butter
def create_band_pass_filter(data, lowcut, highcut, fs, order=2):
    nyquist_freq = 0.5 * fs
    normalized_low_cutoff_freq = lowcut / nyquist_freq
    normalized_high_cutoff_freq = highcut / nyquist_freq
    butterworth = 'band'
    numerator_coefficient, denominator_coefficient = butter(order, [normalized_low_cutoff_freq, normalized_high_cutoff_freq], btype = butterworth)
    filter_output = lfilter(numerator_coefficient, denominator_coefficient, data)
    return filter_output

# filter code adapted from above and following resources:
# https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.lfilter.html
# https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.butter.html
# http://www.neurotec.uni-bremen.de/drupal/node/61
def create_high_pass_filter(data, cutoff, fs, order=2):
    nyquist_freq = 0.5 * fs
    normalized_cutoff_freq = cutoff / nyquist_freq
    butterworth = 'high'
    numerator_coefficient, denominator_coefficient = butter(order, normalized_cutoff_freq, btype = butterworth, analog=True)
    filter_output = lfilter(numerator_coefficient, denominator_coefficient, data)
    return filter_output

# https://wiki.hydrogenaud.io/index.php?title=Pre-emphasis
# https://librosa.org/doc/latest/generated/librosa.effects.preemphasis.html
# code adapted from: https://aadityachapagain.com/posts/speech-signal-processing-using-python
def create_preemphasis(sound, emphasis_factor):
    preemphasized = lfilter([1, -emphasis_factor], 1, sound)
    return preemphasized

# sound amplification 
# https://edurev.in/question/3303118/What-is-the-16-bit-compiler-allowable-range-for-integer-constants-a--3-4e38-to-3-4e38b--32767-to-327#:~:text=In%20a%2016%2Dbit%20C,character%20is%200%20to%20255
def change_volume(sound, volume):
    amplified_sound = sound * volume
    clipped_sound = np.clip(amplified_sound, -32768, 32767).astype(np.int16)
    return clipped_sound

# handles voice activity detection
# code adapted from following references: 
# http://mohitmayank.com/a_lazy_data_science_guide/audio_intelligence/voice_activity_detection/
# https://github.com/marsbroshok/VAD-python
# https://librosa.org/doc/main/generated/librosa.effects.split.html
# https://numpy.org/doc/stable/reference/generated/numpy.where.html
def detect_voice_activity(audio, threshold):
    sound_indices = np.where(np.abs(audio) > threshold)[0]
    if len(sound_indices) > 0:
        start = sound_indices[0]
        end = sound_indices[-1]
        voice_activity = audio[start:end+1]
    else:
        voice_activity = np.array([])
    return voice_activity

# WER Function was adapted from: https://www.thepythoncode.com/article/calculate-word-error-rate-in-python?utm_content=cmp-true
# https://docs.python.org/3/library/stdtypes.html#str.lower
# https://docs.python.org/3/library/stdtypes.html#str.maketrans
# https://docs.python.org/3/library/stdtypes.html#str.split
# https://docs.python.org/3/library/stdtypes.html#str.translate
# https://stackoverflow.com/questions/34293875/how-to-remove-punctuation-marks-from-a-string-in-python-3-x-using-translate
# https://docs.python.org/3/reference/lexical_analysis.html#f-strings
# handles calculation of WER
def calculate_word_error_ratio(target, prediction, language):
    target = normalize_text(target, language)
    prediction = normalize_text(prediction, language)
    
    target_words = target.split()
    predicted_words = prediction.split()

    word_substitutions = 0
    word_insertions = max(0, len(predicted_words) - len(target_words))
    word_deletions = max(0, len(target_words) - len(predicted_words))

    for target_word, predicted_word in zip(target_words, predicted_words):
        if target_word != predicted_word:
            word_substitutions += 1
    
    wer = (word_substitutions + word_insertions + word_deletions) / len(target_words) * 100
    wer_rating = f"{int(wer):.0f}%"  # without decimals and with % sign
    return wer_rating

# # code inspired by: https://www.kaggle.com/code/sudalairajkumar/getting-started-with-text-preprocessing
def normalize_text(normalized_text, language):
    # text normalization 
    normalized_text = normalized_text.lower().translate(str.maketrans('', '', string.punctuation))
    # for spanish language
    if language == "Spanish":
        normalized_text = normalized_text.replace('¿', '')  # delete special character (¿)
    return normalized_text
