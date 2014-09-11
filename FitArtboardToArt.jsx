/**********************************************************

FitArtboardToArt.jsx

DESCRIPTION
In Adobe Illustrator CS4, fit the artboard to the visible bounds of a document.
NOTE: The script leaves behind some artifacts in the document window but is correct.

Darryl Zurn, 2009-11-25 daz-scripting@zzzurn.com

**********************************************************/

if (app.documents.length > 0) {
	var docRef = app.activeDocument;
	if (docRef.artboards.length > 1) {
		alert('Need exactly one artboard');
		  quit;
	}
	// Found 1 artboard

	var myVisibleBounds = docRef.pageItems[0].visibleBounds;

	// The VisibleBounds rect is in this order: left, right, top, bottom
	// so use variables to show which side we are using
	var myLeft = 0;   var myRight = 1;   var myTop = 2;   var myBottom = 3;
	for ( var i = 1; i < docRef.pageItems.length ; i += 1 ) {
		// We want the ultimate maximum bounds, so select the minimum left and bottom, and max right and top of our rect.
		myVisibleBounds[myLeft  ] = Math.min( myVisibleBounds[myLeft  ], docRef.pageItems[i].visibleBounds[myLeft  ] );
		myVisibleBounds[myRight ] = Math.max( myVisibleBounds[myRight ], docRef.pageItems[i].visibleBounds[myRight ] );
		myVisibleBounds[myTop   ] = Math.max( myVisibleBounds[myTop   ], docRef.pageItems[i].visibleBounds[myTop   ] );
		myVisibleBounds[myBottom] = Math.min( myVisibleBounds[myBottom], docRef.pageItems[i].visibleBounds[myBottom] );
	}
	// We have our maximum bounds, so use it to set the document's (only) artboard
	docRef.artboards[0].artboardRect = myVisibleBounds;
}
else {
	alert('Open a document before running this script', 'Error running FitArtboardToArt.jsx');
}
