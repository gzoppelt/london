# London
<p align="center">
<img src="https://github.com/gzoppelt/london/blob/master/app/common/images/neighborhood.png" alt="London Neighborhood">
<br>
Udacity Neighborhood Map Project
<p>

### Task
SPA featuring a neighborhood with
- highlighted locations
- third party data about those locations
- various ways to browse the content
- use of third party JS libraries

### Plan
* AngularJS serves as 3rd party library. (I know it best and it excellently serves the purpose.)
* New York Times will do as API interface. (We worked with this API during the course.)
* London will be my ___neighbourhood___.

### Realisation
I found a London silhouette at a London Underground web site (that's why London Underground is so hugely overrepresented), cut it in pieces, added some details, used some colors, and ended up with 8 pictures in black and red respectively.
Then I created a JSON file which describes each of the sights and contains the file names for the related pictures.
AngularJS turned out to be an excellent choice to create out of the JSON data
* an entry in the left side navigation bar
* the London silhouette in the header
* the map markers in the Goggle map

There are now 3 ways tho browse the content by hovering over or clicking on each of the above mentioned features. If you hover both navi list entry and silhoutte picture are highlighted, if you click a modal page opens with related article of the New York Times related to the chosen sight.

The following third party data are used:
* Google Maps with the locations marked in it
* Google Street View pictures related to the locations (at least partially)
* New York Times articles related (more or less) to the locations

### Statement
I did this project on my own without any external help except for algorithms used in Udacity courses, especially:
* dealing with Google Map
* accessing the New York Times API

___Guenther Zoppelt___
