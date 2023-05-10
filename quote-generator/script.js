const quoteContainer = document.getElementById('quote-generator');
const leftMarker = document.getElementById('left-marker');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true; 

}

// Hide loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false; 
}

// Show new Quote
function newQuote() {
    // Pick a random quote from api quotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Check if author is null and replace it with unknown
    if(!quote.author){
        quoteText.textContent = "Unknown";
    } 
    else{
        authorText.textContent = quote.author;
    } 
    // Check quote length to determine styling
    if(quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    }
    else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, hide loader
    quoteText.textContent = quote.text;

}

// Get Quotes From API 
async function getQuote()  {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl) // the variable will not be populated until we have data fetched from api. We set response after we have data. 
        apiQuotes = await response.json(); // Turning the string into a json object and storing it in global variable 
        newQuote();
    } catch(error) {
        // Catch Error here 
    }
}
// Tweet Quote
function tweetQuote(){
    // template strings allow us to pass in variables 
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank'); 
}

//Event listeners 
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
// on Load run page 
getQuote()
