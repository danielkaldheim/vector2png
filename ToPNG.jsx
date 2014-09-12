/**********************************************************
//	ToPNG.jsx
//	Created on 11.9.2014.
//
//	@author Daniel Rufus Kaldheim <daniel@idrift.no>
//	@copyright 2012 - 2014 iDrift Web AS
//	@version 1.0.0
**********************************************************/

#include "functions.jsxinc"

var destFolder, sourceFolder, files, fileType;

// Select the source folder.
sourceFolder = Folder.selectDialog( 'Select the folder with Illustrator files you want to convert', '~' );

// If a valid folder is selected
if ( sourceFolder != null ) {

	files = new Array();
	fileType = prompt( 'Select type of Illustrator files to you want to process. Eg: *.ai', ' ' );

	baseSize = prompt( 'Select bound size in pixel. Eg: 640x320 (can also be empty)', '' );

	// Get all files matching the pattern
	files = sourceFolder.getFiles( fileType );

	if ( files.length > 0 ) {

		// Get the destination to save the files
		destFolder = Folder.selectDialog( 'Select the folder where you want to save the converted files.', '~' );

		for ( i = 0; i < files.length; i++ ) {

			//file, resolution, filetypes, directory, options
			drk_save.ToResolution(files[i], 100.0, ['png'], destFolder, {
				file: {
					'baseSize' : baseSize
				}
			});

		}

		alert( 'Files are saved in ' + destFolder );
	}
	else {
		alert( 'No matching files found' );
	}

}

// End of file ToPNG.jsx
// Location: /Users/daniel/Documents/Illustrator Scripts/Vector/ToPNG.jsx
