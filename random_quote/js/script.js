//array of objects with quotes
var quotes = [
    {
        quote: "Life isn’t about getting and having, it’s about giving and being.",
        source: "Kevin Kruse",
        tags: "life"
    },
    {
        quote: "If you don't have humour, then you may as well nail the coffin lid down now.",
        source: "Roger Moore",
        tags: "humor"
    },
    {
        quote: "Price is what you pay. Value is what you get.",
        source: "Warren Buffet",
        tags: "business"
    },
    {
        quote: "Political language... is designed to make lies sound truthful and murder respectable, and to give an appearance of solidity to pure wind.",
        source: "George Orwell",
        tags: "politics"
    },
    {
        quote: "Ridiculously expensive lifestyles while thinking they were completely normal, and then being baffled when they had no money left over to buy their own freedom.",
        source: "Peter Adeney",
        tags: "finance"
    },
    {
        quote: "I’ve missed more than 9000 shots in my career. I’ve lost almost 300 games. 26 times I’ve been trusted to take the game winning shot and missed. I’ve failed over and over and over again in my life. And that is why I succeed.",
        source: "Michael Jordan",
        tags: "life"
    }
];

//colors for random background color
const colors = ["red", "blue", "green", "grey", "purple"];

//store shown quotes here so we can check they are not repeated.
let shownQuote = [];
let quote, quoteTimeout;

/*  This will print a random quote to the index page
    This wll call the checkRepeatQuote function to not display the same quote twice
    until all quotes have been displayed
*/
printQuote = () => {
    quote = getRandomQuote();
    //check to make sure it has not been displayed before
    checkRepeatQuote(quote);
    //set our local variables
    let source = quote.source;
    let tags = quote.tags;
    quote = quote.quote;

    //create our strings/HTML for the web page
    let quoteHTML = '<p class="quote">' + quote + '</p>';
    let sourceHTML = '<p class="source">' + source + ', <span class="tags">' + tags + '</span> </p>';

    //insert the html strings into the 'quote-box' div
    document.getElementById('quote-box').innerHTML = quoteHTML + sourceHTML;

    //change the background to a random color from the colors array
    let randomColor = Math.floor(Math.random() * 5);
    document.body.style.backgroundColor = colors[randomColor];

    //log quotes to the console so we can be sure it has not been repeated
    console.log(quote);

    //clear the timer
    window.clearTimeout(quoteTimeout);
    //restart 30 second quote timer
    refreshQuote();
}

/*  This functon will first check that all quotes have been shown, if so, empty
    the array so we can start over.
    Otherwise we use the find method on the shownQuote array, if we find the quote
    we set the global variable "quote" to a new random quote and recursively call
    the checkRepeatQuote function to do this check again. Until we find a un-Shown
    quote, then push it to the shownQuote array.
*/
checkRepeatQuote = (quoteToShow) => {
    if (shownQuote.length === quotes.length) {
        shownQuote = [];
    }
    if (shownQuote.find(previousQuote => previousQuote === quoteToShow)) {
        quote = getRandomQuote();
        checkRepeatQuote(quote);
    } else {
        shownQuote.push(quoteToShow);
    }
}

//Returns a random quote
getRandomQuote = () => {
    let randomQuote = Math.floor(Math.random() * 6);
    return quotes[randomQuote];
}

//This will call the printQuote function every 30 seconds to display a new quote
refreshQuote = () => {
    quoteTimeout = window.setTimeout(printQuote, 30000);
}

//iniate the refreshQuote so it updates every 30 seconds even if the button is
//never clicked
refreshQuote();

// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);
