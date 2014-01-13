# Fluid Responsive Feature Area

## Base Feature Markup

        <li class="ga_ualberta_fma">
          <div class="feature-wrapper">
            <div class="feature-image">
              <img src="{{IMG_LOCATION}}" />
            </div>
              <div class="feature-content">
                <h3>{{TITLE}}</h3>
                <p>{{DESCRIPTION}}</p>
                <div class="feature-buttons">
                	{{BUTTONS}}
                </div>
              </div>
            </div>
        </li>


## Mobile Options

### Caption Overlay (0px - 690px)

The option to overlay the feature-content div overtop of the image on mobile can be anabled by adding the `mob-overlay-caption-mobile` class to the .feature-content div element.
		
#### Markup Example

		...
        <div class="feature-content mob-overlay-caption">
        ...

### Image Focus (0px - 980px)

On low resolutions the feature image maintains a fixed height and only a portion of the image is displayed, while the remaining part of the image is outside of the viewport.  You can specify the focal point of the image by assigning the `.feature-image` element with one of the following classes:

	- `.focus-left`: Keeps left part of image visible
	- `.focus-center`: Keeps center part of image visible
	- `.focus-right`: keeps right part of image visible

##Tablet+ Options

At the tablet breakpoint (~690px) the content area becomes an island floating on top of the image.

You must set a width and a height for the island, based on the content.

### Content Islands (690px+)

By default, setting the width/height for the island will place it in the center of the image, both vertically and horizontally.

I have created 3 additional classes for positioning the island:

	- `.bottom-island`: aligns the island to the bottom of the image
	- `.left-island`: aligns the island to the left of the image
	- `.right-island`: aligns the island to the right of the image

#### Markup Example

In this example, the content island will be anchored to the bottom left of the image.
		
		...
        <div class="feature-content bottom-island left-island">
        ...

### Dark/Light vs. Light/Dark Islands

Two treatments are available for island overlays.  The default provided is a light background with dark text treatment.  This may not be suitable for all images, so the following class may be used on the `.feature-content` element:

	- `.dark`: assigns light text / dark background to the island

#### Markup Example

In this example, the content island will have a dark background and be anchored to the bottom right of the image.
		
		...
        <div class="feature-content bottom-island right-island dark">
        ...
