import deepspeech_en
import deepspeech_es
import deepspeech_it
from tabulate import tabulate
import numpy as np

# handles printing of combined results tables for all languages
def print_combined_results_table():
    # combined resuls table for english, spanish and italian 
    combined_resuls_table = deepspeech_en.condensed_table_en + deepspeech_es.condensed_table_es + deepspeech_it.condensed_table_it

    headers = ['Language', 'File', 'WER']
    # print results by using grid table format
    print(tabulate(combined_resuls_table, headers=headers, tablefmt='grid'))

if __name__ == '__main__':
    print_combined_results_table()

# handles printing of average table for all languages
def print_language_summary_table():
    # english calculation of average WER
    wer_rating_en = [float(row[4].replace('%', '')) for row in deepspeech_en.results_en]
    avg_en = np.mean(wer_rating_en)
    avg_rounded_wer_en = round(avg_en)

    # spanish calculation of average WER
    wer_rating_es = [float(row[4].replace('%', '')) for row in deepspeech_es.results_es]
    avg_es = np.mean(wer_rating_es)
    avg_rounded_wer_es = round(avg_es)

    # italian calculation of average WER
    wer_rating_it = [float(row[4].replace('%', '')) for row in deepspeech_it.results_it]
    avg_it = np.mean(wer_rating_it)
    avg_rounded_wer_it = round(avg_it)

    # store average WER ratings 
    avg_list = [['English', f"{avg_rounded_wer_en}%"], ['Spanish', f"{avg_rounded_wer_es}%"], ['Italian', f"{avg_rounded_wer_it}%"]]

    avg_headers = ['Language', 'WER (AVG)']

    # create table for all languages by using grid tabulate format
    avg_wer_table_all_languages = tabulate(avg_list, avg_headers, tablefmt='grid')
    print(avg_wer_table_all_languages)

if __name__ == '__main__':
    print_language_summary_table()
    