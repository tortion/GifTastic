# GifTastic
Giphy Application

App uses css sizing and two rows of 6 columns via bootstrap
to neatly display two rows of GIFs from the selected theme.

User can add additional buttons and care has been taken
so that the 2nd row, etc. do not infringe on the bottom
margin of the prior row.

The "s" search portion of the API is leveraged and an
additional offset (a random # between 1-120) is issued
to affect some degree of randomness.

KNOWN BUGS:

If the randomly selected offset is greater than the 
number of GIFs that can be referenced, then no GIFs will
be displayed.  All of the built in themes have at least
the number of GIFs required to support the 1..120 random.


