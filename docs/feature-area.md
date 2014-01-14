# Fluid Responsive Feature Area

Demo: http://www.ualberta.ca/~publicas/uofa/index-fluid-qa.html

## Base Feature Markup

Note: Classes that appear in square brackets are optional classes used to override default behaviour.

        <li class="ga_ualberta_fma">
          <div class="feature-wrapper [unique-feature-class]">
            <div class="feature-image [focus-left, focus-center, focus-right]">
              <img src="{{IMG_LOCATION}}" />
            </div>
              <div class="feature-content [dark, bottom-island, left-island, right-island]">
                <h3>{{TITLE}}</h3>
                <p>{{DESCRIPTION}}</p>
                <div class="feature-buttons">
                	{{BUTTONS}}
                </div>
              </div>
            </div>
        </li>


## Mobile Overrides

### Image Focus (0px - 980px)

On low resolutions the feature image maintains a fixed height and only a portion of the image is displayed, while the remaining part of the image is outside of the viewport.  You can specify the focal point of the image by assigning the `.feature-image` element with one of the following classes:

  - `.focus-left`: Keeps left part of image visible
  - `.focus-center`: Keeps center part of image visible
  - `.focus-right`: keeps right part of image visible

## Tablet+ Overrides

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

### Dark/Light vs. Light/Dark Islands (980px+)

Two treatments are available for island overlays.  The default provided is a light background with dark text treatment.  This may not be suitable for all images, so the following class may be used on the `.feature-content` element:

  - `.dark`: assigns light text / dark background to the island

#### Markup Example

In this example, the content island will have a dark background and be anchored to the bottom right of the image.
		
		...
        <div class="feature-content bottom-island right-island dark">
        ...


## Full Feature Markup Example

Seen below is the markup for a feature with the following options set:

  - Width/height of the island assigned on page through `.example-feature`
  - Focal point set to the right side of the image assigned by `.focus-right`.
  - Light text on dark background for the island assigned by `.dark`
  - Island left aligned with `.left-island`
  - Island bottom aligned with `.bottom-island`


Added to index `<head>`:

        <style type="text/css">
            /* island width/height */
            .example-feature {
                width: 20em;
                height:10em;
            }
        </style>


Added to the feature container:

        <li class="ga_ualberta_fma">
          <div class="feature-wrapper example-feature">
            <div class="feature-image focus-right">
              <img src="{{IMG_LOCATION}}" />
            </div>
              <div class="feature-content dark bottom-island left-island">
                <h3>Dino 101 is Back</h3>
                <p>Take it again for the first time</p>
                <div class="feature-buttons">
                    <a href="{{URL}}" class="btn btn-green">Find Out More</a>
                </div>
              </div>
            </div>
        </li>
