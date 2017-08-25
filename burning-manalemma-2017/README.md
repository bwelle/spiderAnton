<span style="display: none" > [You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://rawgit.com/ladybug-tools/spider/master/burning-manalemma-2017/index.html 'View file as a web page.' ) </span>

# Burning mAnalemma 2017 Read Me


<iframe class=iframeReadMe src="https://rawgit.com/ladybug-tools/spider/master/burning-manalemma-2017/index.html" width="800" height="500" >


<img src="../images/ladybug-logo.png" >
</iframe>
_Can you be at Burning Man without going there? Of course not. So let's bring Burning Man over to your place._


<span style="display: none" >Not visible in GitHub source code view or small screens</span>

<!--
<iframe class=iframeReadMe src="r1/burning-manalemma-2017-r1.html" width="800" height="500" ></iframe>
-->

## Full Screen: [Burning mAnalemma 2017]( https://rawgit.com/ladybug-tools/spider/master/burning-manalemma-2017/index.html )


## Concept


If you are not going to Burning Man, but you still need to be there then you need the terrain, the map, the Temple Burn - and he Sun.

Actually, Burning Man is more convenient as a phone app. Let's do it.

What do we eed?

### Analemmas

> Analemmas are the traditional figure eight ( or infinity symbol on its side) representation of Sun positions.

* https://en.wikipedia.org/wiki/Analemma
* [Motions of the Sun Simulator]( http://astro.unl.edu/naap/motion3/animations/sunmotions.html )
* [Imgur: How the sun looks when you take a pictures at the same place and time every week for a year]( http://imgur.com/61YTxQ2 )
	* See also more links in the comments
* [StackEchange: How does the appearance of the analemma vary with latitude?]( http://astronomy.stackexchange.com/questions/12590/how-does-the-appearance-of-the-analemma-vary-with-latitude )
* [Science Blog: Why Our Analemma Looks like a Figure 8]( http://scienceblogs.com/startswithabang/2009/08/26/why-our-analemma-looks-like-a/ )
* [Stanford Solar Center: Viewing and Understanding the Analemma]( http://solar-center.stanford.edu/art/analemma.html )
* [analemma.com]( http://www.analemma.com/pages/framespage.html ) << mostly broken
* [Figure-Eight in the Sky]( http://www.astronomycorner.net/games/analemma.html ) - inclueds C Sun position code
* [The Analemma Dilemma]( http://www.math.nus.edu.sg/aslaksen/projects/Hannalemma.pdf )
* [Analemmas on the gnomon and on the dial plate]( http://www.illustratingshadows.com/analemma.pdf )
* [analemma.space]( http://analemma.space/ )


### Burning Man

> A city in the desert. A culture of possibility. A network of dreamers and doers.

* https://burningman.org/
* https://en.wikipedia.org/wiki/Burning_Man
* https://twitter.com/burningman?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor
* https://www.facebook.com/burningman/
* https://www.reddit.com/r/BurningMan/
* https://www.instagram.com/burningman/?hl=en

### Temple 2017

> The Temple is a place of refuge, mourning, and healing. The **Temple Burn** is a solemn ritual; a cleansing, a rite of passage, a pyre. We are honored to create and share this project with the Burning Man community and invite all to contribute.

* http://www.temple2017.org/
* https://www.facebook.com/brctemple2017/
* https://www.instagram.com/temple_2017/
* https://twitter.com/temple_2017


More in the next few days. In the mean time here's some background:


### Mission

* 3D terrain, 2D raster maps and 3D structures all visible and manipulable in in a single app
* Easy peasy, free open source entry level code
* Simple dependencies
	* Three.js for 3D
	* ShowDown for Markdown Conversion
	* Mapbox for the data tiles
* Basic code is under 900 lines / 23KB
* User interface and technical code well separated
* Carry out simple Sun-related coding exercises 



### Features

* 3D terrain for the entire Globe
* Support for 19 levels of zoom
* 3D buildings at zoom levels 15 and 16
* Many raster map overlays from Mapbox, Google, OSM etc
* Go to any location on Earth by entering a place name or address
* Display a variety of Solar parameters analemmas, solar range and solar access
* Access on tablets and mobile devices



### Vision

* Taking maps to new places

## Things you can do using the script

* Use one/two/three fingers to rotate/zoom/pan the display in 3D
	* Or left/scroll/right with your pointing device
* Click the three bars( 'hamburger menu icon' ) to slide the menu in and out
* Click the [Stats]( https://github.com/mrdoob/stats.js/ ) box in the top corner to toggle FPS / MS / MB views
* Press Control-U/Command-Option-U to view the source code
* Press Control-Shift-J/Command-Option-J to see if the JavaScript console reports any errors
* Click 'Show fps statistics' to see how many frames per second your computer is giving you




## Issues


## To-Do

* 2017-07-31 ~ Add credits to Mapbox, Google, Mr.doob, GitHub and many others
* 2017-07-31 ~ Improve geoJSON reading capabilities
* 2017-07-25 ~ Select quality of raster tile display



## Ladybug Web Solar Calculator 

* http://www.ladybug.tools/ladybug-web/solar-calculator-ladybug-web/#readme.md



## Change Log

### 2017-08-24 ~ Theo

* First commit on spider repo