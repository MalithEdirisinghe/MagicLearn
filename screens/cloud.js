
const sendAudioToSpeechToText = async () => {
    try {
        // Check if recording is available
        if (!recording || !recording.getURI) {
            console.error('Recording is not available or does not have a valid URI');
            return;
        }

        // Get the URI of the recorded audio
        const uri = recording.getURI();

        // Check if URI is available
        if (!uri) {
            console.error('Recording URI is not available');
            return;
        }

        // Read the audio file as base64
        const base64Audio = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        console.log('Base64 Audio:', base64Audio);

        // Make API call to Google Cloud Speech-to-Text
        const response = await fetch(
            'https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyDKqJAdut7sTZqUZFF9aHk8ibVToA9htSI',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "config": {
                        "encoding": "FLAC",
                        "sampleRateHertz": 8000,
                        "languageCode": "en-US",
                        "enableWordTimeOffsets": false
                    },
                    "audio": {
                        "uri": "gs://magic_learn-1/audio.flac"
                    }
                }),
            }
        );

        console.log('API Response:', response);

        // Parse the response
        const data = await response.json();

        console.log('Transcription Data:', data);

        // Extract the transcript from the response
        const transcript = data.results[0]?.alternatives[0]?.transcript;


        if (!transcript) {
            console.error('Transcript not found in the response');
            return;
        }

        // Update state with the transcript
        setTranscription(transcript);
    } catch (error) {
        console.error('Error transcribing audio:', error);
    }
};