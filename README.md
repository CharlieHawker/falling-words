## Falling Words

Falling Words is a javascript and CSS3 experiment that replaces a target paragraph of text with a duplicate version where the words have been split into individual DIVs. The last word in the paragraph is then animated with CSS3 transformations such that it 'falls' off the end of the paragraph and out of sight.

As each word falls out of sight it is removed from the DOM with javascript, thus allowing the animation bound to the `last-child` of the parent wrapper to self-propogate as each word is removed.