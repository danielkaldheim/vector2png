vector2png
==========

Adobe Illustrator batch scripts for handeling vector to PNG and/or SVG


## Installation

OS X:
```
cd "/Applications/Adobe Illustrator CC 2014/Presets.localized/en_GB/Scripts"
git clone git@github.com:danielkaldheim/vector2png.git
```


## Usage
Select **File** -> **Scripts** -> **vector2png** -> select scripts:


## Scripts
* **ToAndroidSet** This creates PNG's in sizes: ldpi (56.25%), mdpi (75.0%), hdpi (100%), xhdpi (150%), xxhdpi (200%)
* **ToiOSImageSet** This creates PNG's in sizes: normal (100%) and retina @2x (200%). This scipt puts both images in .imageset folder. To create JSON file for easy import to XCode use *createjson.php* script: ``` /Applications/Adobe\ Illustrator\ CC\ 2014/Presets.localized/en_GB/Scripts/createjson.php ~/Desktop/destinationfolder/ ```
* **ToPNG** This creates a PNG from vector files
* **ToPNGAndSVG** This creates a PNG and a SVG file from vector files
