// https://meyda.js.org/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
// handles checking if mayda library is available 
function isMeydaAvailable() {
    return typeof Meyda !== "undefined";
}

// handles creation of audio analyzer with Meyda
function createAudioAnalyzer() {
    meyda_analyzer = Meyda.createMeydaAnalyzer({
        "audioContext": getAudioContext(), // performs audio processing but it needs to be initialized
        "source": audio_file, // source is audio file (unprocessed)
        "bufferSize": 512, // scriptProcessorNode which is outdated, but I couldnt figure out how to get rid of the browser message 
        "featureExtractors": ["spectralSpread", "spectralRolloff", "spectralCentroid", "rms", "zcr"], // extracted features from meyda
        "callback": updateVisualEffects // called when audio is analyzed and features are extracted
    });
    meyda_analyzer.start(); // starts extraction of features (important: without it browser has errors)
}