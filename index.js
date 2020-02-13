const cheerio = require('cheerio')
const axios = require('axios')

const $ = cheerio.load('<p id="example">This is an <strong>example</strong> paragraph</p>')


axios.get('https://gfss.sd51.bc.ca').then((response) => {
        // Load the web page source code into a cheerio instance
    const $ = cheerio.load(response.data)

    // The pre.highlight.shell CSS selector matches all `pre` elements
    // that have both the `highlight` and `shell` class
    const blockContainer = $('div.et_pb_blurb_container')

    // We now loop through all the elements found
    for (let i = 0; i < blockContainer.length; i++) {
        // Since the URL is within the span element, we can use the find method
        // To get all span elements with the `s1` class that are contained inside the
        // pre element. We select the first such element we find (since we have seen that the first span
        // element contains the URL)
        const blockP = $(blockContainer[i]).find('div.et_pb_blurb_description')[0]

        // We proceed, only if the element exists
        if (blockP && i == 0) { // 0 1 2 3
            const blockText = $(blockP).text()

            // We then print the text on to the console
            console.log("-------- \n"+blockText+"\n-------- \n")
        }
    }
})

// ([a-zA-Z]+)\s–\s(.),\s(.),\s(.) .+\s.,\s(.)

// regex to parse (Wensday) (A) (B) (C) (D)

//console.log(dom.window.document.getElementsByClassName("et_pb_blurb_container").firstChild);




//"https://gfss.sd51.bc.ca",