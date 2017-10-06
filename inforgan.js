class Topic {
    constructor(name, description='', quotes=[], PPTs=[], PDFs=[], citations=[]) {
        this.name = name;
        this.description = description;
        this.quotes = quotes;
        this.citations = citations;
        this.PPTs = PPTs;
        this.PDFs = PDFs;

        this.subsections = [];
        this.order = [];
    }

    json() {
        return {
            description: this.description,
            quotes: this.quotes,
            citations: this.citations,
            PPTs: this.PPTs,
            PDFs: this.PDFs,
            subsections: this.subsections,
            order: this.order
        };
    }
};

class SubSection {
    constructor(name) {
        this.name = name;
    }
}

class Quote {
    constructor(quotation, description, url, parent) {
        this.description = description;
        this.quotation = quotation;
        this.url = url;
        this.parent = parent;
    }
};

class Citation {
    constructor(description, url, parent) {
        this.description = description;
        this.url = url;
        this.parent = parent;
    }
};

class PPT {
    constructor(description, url, parent) {
        this.description = description;
        this.url = url;
        this.parent = parent;
    }
};

class PDF {
    constructor(description, url, parent) {
        this.description = description;
        this.url = url;
        this.parent = parent;
    }
};

class Video {
    constructor(url, description, parent) {
        this.url = url;
        this.description = description;
        this.parent = parent;
    }
};

// Utility functions

function storeTopic(topic) {
    var name = topic.name;
    chrome.storage.sync.set({
        name: topic
    },
    function() {
        console.log("Topic is stored");
    });
}

function retrieveTopic(topic, callback) {
    chrome.storage.sync.get(topic.name, function(object) {
        callback(object);
    });
}

// Main execution

function handleCreation(object, tab) {
    var mediaType = object.mediaType;
    var linkUrl = object.linkUrl;
    var srcUrl = object.srcUrl;
    var pageUrl = object.pageUrl;
    var frameUrl = object.frameUrl;
    var selectionText =  object.selectionText;

    var topicName = prompt("Enter topic being researched: ");
    var descriptionText = prompt("Enter text describing the quoted text(if any).")

    var topic;
    retrieveTopic(topicName, function(ret) {topic = ret;});
    if (!topic) {
        topic = new Topic(topicName, prompt("This is a new topic, enter description for topic."))
    }
    console.log("topic: ", topic);

    if (selectionText) {
        var quote = new Quote(selectionText, linkUrl, descriptionText)
        topic.quotes.push(quote);
    }

    storeTopic(topic);
}

chrome.contextMenus.create({
    'type': 'normal',
    'title': 'Nebula - Quote it',
    'contexts': ['page', 'selection'],
    'onclick': handleCreation,
    'enabled': true
},
function() {

}
);
