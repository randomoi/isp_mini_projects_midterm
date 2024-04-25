
# Intelligent Signal Processing - Mini projects - Midterm

*Please note that each project must be opened individually.*
***

## **Table of Contents**
1. [EX1 Midterm - If you can dream...](#ex1-midterm---if-you-can-dream)
2. [EX2 Midterm - Voice Recognition of Colors and Shapes](#ex2-midterm---voice-recognition-of-colors-and-shapes)
3. [EX3 Midterm - Decoding and Encoding Messages](#ex3-midterm---decoding-and-encoding-messages)
4. [EX4 Midterm - Speech Recognition Systems](#ex4-midterm---speech-recognition-systems)
    - [Project Setup and Installation](#project-setup-and-installation)
    - [Imported Libraries](#imported-libraries)
    - [Credit](#credit)


### **EX1 Midterm - If you can dream...**

- Open project in VS Code (must be opened separately from other projects)
- Select **sketch.js**
- Press **Go Live** at the bottom of the screen. You will be re-directed to browser to view the project.

### **EX2 Midterm - Voice Recognition of Colors and Shapes**

- Open project in VS Code (must be opened separately from other projects)
- Select **sketch.js**
- Press **Go Live** at the bottom of the screen. You will be re-directed to browser to view the project.

### **EX3 Midterm - Decoding and Encoding Messages**

- Please use Jupyter Notebooks to run the project. 

### **EX4 Midterm - Speech Recognition Systems**

**Models**

	DeepSpeech English Model
	DeepSpeech Spanish Model
	DeepSpeech Italian Model

	Google Speech-to-Text English Model

	PocketSphinx English Model

### **Project Setup and Installation**

- The project was developed on MacOS and tested in Terminal.

- The ASR Comparison File takes a long time to load due to PocketSphinx.

1. Unzip the project folder

2. Navigate to the project directory

	    cd [file name]

3. Create a virtual environment 
	    
        python3.8 -m venv env

4. Activate the virtual environment
	
        source env/bin/activate

5. Check version 3.8 
	
        python --version

6. Install the dependencies 
	
        pip install -r requirements.txt

7. Start individual files

    DeepSpeech English Model

        python deepspeech_en.py

    DeepSpeech Spanish Model

        python deepspeech_es.py

    DeepSpeech Italian Model

        python deepspeech_it.py

    DeepSpeech Statistics for All Models

        python results_statistics.py

    Further Development: comparing DeepSpeech, Google Speech-to-Text and PocketSphinx
    
        python asr_evaluation.py

### **Imported Libraries**

    from google.cloud import speech
    from pocketsphinx import LiveSpeech
    from scipy.io import wavfile
    from scipy.signal import butter, lfilter
    from tabulate import tabulate
    import deepspeech
    import noisereduce as nr
    import numpy as np
    import string
    import wave

### **Credit**

- Sentence 1 quote by Norman Vincent Peale: [BrainyQuote](https://www.brainyquote.com/quotes/norman_vincent_peale_130593?src=t_inspirational)
- Sentence 2 quote by Lily Tomlin: [Philosiblog](https://philosiblog.com/2012/07/09/i-always-wanted-to-be-somebody-but-now-i-realize-i-should-have-been-more-specific/)


*Author: https://github.com/randomoi/*