function searchWord() {
    const searchInput = document.getElementById('searchInput').value;
    const resultSection = document.getElementById('resultSection');
    resultSection.innerHTML = ''; 

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No entry found');
            }
            return response.json();
        })
        .then(data => {
            const wordData = data[0];
            if(wordData) {
                let outputHtml = `<h2>${wordData.word}</h2>`;
                let synonyms = [];
                let antonyms = [];

                wordData.meanings.forEach(meaning => {
    meaning.definitions.forEach(def => {
        outputHtml += `<p><b>${meaning.partOfSpeech}:</b> ${def.definition}</p>`;
        if(def.synonyms && def.synonyms.length > 0) {
            synonyms = [...synonyms, ...def.synonyms];
        }
        if(def.antonyms && def.antonyms.length > 0) {
            antonyms = [...antonyms, ...def.antonyms];
        }
    });
    if(meaning.synonyms && meaning.synonyms.length > 0) {
        synonyms = [...synonyms, ...meaning.synonyms];
    }
    if(meaning.antonyms && meaning.antonyms.length > 0) {
        antonyms = [...antonyms, ...meaning.antonyms];
    }
});

                // Display synonyms
                outputHtml += '<h3>Synonyms:</h3><p>';
                if(synonyms.length > 0) {
                    outputHtml += synonyms.join(', ');
                } else {
                    outputHtml += 'No synonyms found.';
                }
                outputHtml += '</p>';

                // Display antonyms
                outputHtml += '<h3>Antonyms:</h3><p>';
                if(antonyms.length > 0) {
                    outputHtml += antonyms.join(', ');
                } else {
                    outputHtml += 'No antonyms found.';
                }
                outputHtml += '</p>';

                resultSection.innerHTML = outputHtml;
            } else {
                throw new Error('No entry found');
            }
        })
        .catch(error => {
            resultSection.innerHTML = '<p>No results found.</p>';
        });
}

