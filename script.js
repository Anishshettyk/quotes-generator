const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quotes');
const loader = document.getElementById('loader');
const linkInfo = document.getElementById('link-info');

//show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hode loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}
//GET QUOTES FROM API.
async function getQuote() {
    loading();
    //used to get rid of errors in cors module.
    const proxyUrl = 'https://nameless-dawn-73297.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        //if the author is not there then we will change author to unknown.
        if (data.quoteAuthor === "") {
            authorText.innerText = "Unknown";
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        //reduce font size for long quotes.
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        linkInfo.setAttribute('href', data.quoteLink);

        quoteText.innerText = data.quoteText;

        //stop loader
        complete();

    } catch (err) {
        getQuote() //if there is a ne w error then we will call the function again with new quotes.
        console.log(`something went wrong !! ${err}`);
    }
}


//twitter function.
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, "_blank");
}

//event listener.
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


//on load
getQuote();