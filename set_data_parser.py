import json

minified_cards = {}
basics = ['Plains', 'Island', 'Swamp', 'Mountain', 'Forest']
with open('AllSets.json', 'r') as f:
    text = f.read()
    all_sets = json.loads(text)
    for set_name, details in all_sets.iteritems():
        cards = details['cards']
        for card in cards:
            if card['name'] not in basics:
                if set_name not in minified_cards:
                    minified_cards[set_name] = []
                minified_cards[set_name].append(card['name'])
    print json.dumps(minified_cards)

