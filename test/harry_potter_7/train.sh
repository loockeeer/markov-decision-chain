wget https://raw.githubusercontent.com/neelk07/neelkothari/master/blog/static/data/text/Harry%20Potter%20and%20the%20Deathly%20Hallows.txt --output-document training.data

node ../../src/index.js train --trainingFile training.data --outputFile model.model --sep \n\n\n\n\n\n\n\n\n --ngrams 5