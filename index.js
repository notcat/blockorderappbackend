const cheerio = require('cheerio')
const axios = require('axios')

var express = require("express");
var app = express();

const port = 16942;

var blockOrderJSON;

axios.get('https://gfss.sd51.bc.ca').then((response) => {
        // Load the web page source code into a cheerio instance
    const $ = cheerio.load(response.data)

    // gets a array of each container, and there can be 3+ containers
    // usually there is 1-2 block order containers with 1 extra container for school
    // information such as registration forms but there is the off chance
    // where there is 4 containers.
    const blockContainer = $('div.et_pb_blurb_container')

    // We now loop through all the elements found
    for (let i = 0; i < blockContainer.length; i++) {
        // there are 3+ containers on the website
        // each has its own paragraph of information
        // Monday - A B C (Lunch) C D
        const blockP = $(blockContainer[i]).find('div.et_pb_blurb_description')[0]

        // We proceed, only if the element exists
        if (blockP && i == 0) { // 0 1 2 3
            const blockText = $(blockP).text()
            blockOrderJSON = blockText;
            console.log("-------- \n"+blockText+"\n-------- \n")
        }
    }
})

// ([a-zA-Z]+)\s–\s(.),\s(.),\s(.) .+\s.,\s(.)

// regex to parse (Wednesday) (A) (B) (C) (D)


// TODO:
// regex REMOVE from the string using the regex above ^ to get any extra information, i.e. "FAMILY DAY, NO SCHOOL MONDAY."


app.listen(port, () => {
    console.log("Server running on port "+port);
});

app.get("/api/blockorderexample", (req, res, next) => {
    res.json({
        "container1": {
            "Monday": ["A","B","C","D"],
            "Tuesday": ["B","C","D","A"],
            "Wednesday": ["C","D","A","B"],
            "Thursday": ["D","A","B","C"],
        }
    });
});

app.get("/api/blockorder", (req, res, next) => {
    res.json(blockOrderJSON);
});

// container(i) > Day(monday) > blockorder in indivudual elements, (a)(b)(c)(d) > the result of regex - string, i.e. extra text like MONDAY NO SCHOOL
