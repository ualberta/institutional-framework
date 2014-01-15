BOOTSTRAP = ./compiled/css/ualberta.css
BOOTSTRAP_LESS = ./less/ualberta.less
BOOTSTRAP_RESPONSIVE = ./docs/assets/css/bootstrap-responsive.css
BOOTSTRAP_RESPONSIVE_LESS = ./less_docs/responsive.less
PROTOTYPE = ./prototype/css/ualberta.css
PROTOTYPE_LESS = ./less/ualberta.less
PAGESDIR = ../institutional-framework-pages
PRODDIR = ../production
DATE=$(shell date +%I:%M%p)
CHECK=\033[32m✔\033[39m
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#


#
# BUILD DOCS
#

build:
	@echo "\n${HR}"
	@echo "Building Bootstrap..."
	@echo "${HR}\n"
	@jshint js/*.js --config js/.jshintrc
	@jshint js/tests/unit/*.js --config js/.jshintrc
	@echo "Running JSHint on javascript...             ${CHECK} Done"
	@recess --compile ${BOOTSTRAP_LESS} > ${BOOTSTRAP}
	@recess --compile ./less/ualberta-ie7.less > ./compiled/css/ualberta-ie7.css
	@recess --compile ./less/faculty.less > ./css/faculty.css
	@echo "Compiling LESS with Recess...               ${CHECK} Done"
	@cat js/bootstrap-transition.js js/bootstrap-alert.js js/bootstrap-button.js js/bootstrap-carousel.js js/bootstrap-collapse.js js/bootstrap-dropdown.js js/bootstrap-modal.js js/bootstrap-tooltip.js js/bootstrap-popover.js js/bootstrap-scrollspy.js js/bootstrap-tab.js js/bootstrap-typeahead.js js/bootstrap-affix.js > compiled/js/bootstrap.js
	@uglifyjs -nc compiled/js/bootstrap.js > compiled/js/bootstrap.min.js

	@echo "Compiling and minifying javascript...       ${CHECK} Done"
	@echo "\n${HR}"
	@echo "Bootstrap successfully built at ${DATE}."
	
#
# BUILD LESS ONLY
#

less:
	@lessc -x ./less/framework.less > ./css/framework.css
	@lessc -x ./less/framework-base.less > ./css/framework-base.css
	@lessc -x ./less/framework-ie.less > ./css/framework-ie.css
	@echo "Compiling framework base less...             ${CHECK} Done"
	@lessc -x ${PROTOTYPE_LESS} > ./css/ualberta.css
	@lessc -x ./less/ualberta-ie.less > ./css/ualberta-ie.css
	@echo "Compiling ualberta institutional less...     ${CHECK} Done"
	@lessc -x ./less/faculty.less > ./css/faculty.css
	@lessc -x ./less/faculty-ie.less > ./css/faculty-ie.css
	@echo "Compiling faculty base less...               ${CHECK} Done"
	@for file in `find ./less/custom -type f -name '*.less'`; do lessFilePath="$$file"; cssFilePath="$${lessFilePath/.\/less/.}"; cssFilePath="$${cssFilePath/%.less/.css}"; mkdir -p $$(dirname "$$cssFilePath"); lessc -x "$$lessFilePath" > "$$cssFilePath"; done
	@echo "Compiling custom faculty less...               ${CHECK} Done"

#
# COMPILE PRODUCTION BRANCH
#

production:
	@mkdir -p ./css
	@mkdir -p ./custom
	@mkdir -p ${PRODDIR}
	@mkdir -p ${PRODDIR}/css
	@mkdir -p ${PRODDIR}/font
	@mkdir -p ${PRODDIR}/img
	@mkdir -p ${PRODDIR}/ico
	@mkdir -p ${PRODDIR}/js
	@mkdir -p ${PRODDIR}/custom
	@lessc -x ./less/framework.less > ./css/framework.css
	@lessc -x ./less/framework-ie.less > ./css/framework-ie.css
	@echo "Compiling framework base less...             ${CHECK} Done"
	@lessc -x ${PROTOTYPE_LESS} > ./css/ualberta.css
	@lessc -x ./less/ualberta-ie.less > ./css/ualberta-ie.css
	@echo "Compiling ualberta institutional less...     ${CHECK} Done"
	@lessc -x ./less/faculty.less > ./css/faculty.css
	@lessc -x ./less/faculty-ie.less > ./css/faculty-ie.css
	@echo "Compiling faculty base less...               ${CHECK} Done"
	@cp -r ./css ${PRODDIR}
	@cp -r ./img ${PRODDIR}
	@cp -r ./ico ${PRODDIR}
	@cp -r ./font ${PRODDIR}
	@echo "Copying css, images, icons, and fonts...     ${CHECK} Done"
	@for file in `find ./less/custom -type f -name '*.less'`; do lessFilePath="$$file"; cssFilePath="$${lessFilePath/.\/less/.}"; cssFilePath="$${cssFilePath/%.less/.css}"; mkdir -p $$(dirname "$$cssFilePath"); lessc -x "$$lessFilePath" > "$$cssFilePath"; done
	@echo "Compiling custom less...                     ${CHECK} Done"
	@cp -r ./custom ${PRODDIR}
	@echo "Copying custom files...                      ${CHECK} Done"
	@cat js/bootstrap-collapse.js js/bootstrap-dropdown.js js/bootstrap-modal.js js/bootstrap-tooltip.js js/bootstrap-popover.js js/bootstrap-tab.js > ${PRODDIR}/js/bootstrap.js
	@uglifyjs -nc ${PRODDIR}/js/bootstrap.js > ${PRODDIR}/js/bootstrap.min.js
	@cp -r ./js ${PRODDIR}
	@echo "Minifying and copying javascript...          ${CHECK} Done"
	(cd ../production; git add .; git commit -a -m prod; git push origin production --force)

production-no-push:
	@mkdir -p ./css
	@mkdir -p ./custom
	@mkdir -p ${PRODDIR}
	@mkdir -p ${PRODDIR}/css
	@mkdir -p ${PRODDIR}/font
	@mkdir -p ${PRODDIR}/img
	@mkdir -p ${PRODDIR}/ico
	@mkdir -p ${PRODDIR}/js
	@mkdir -p ${PRODDIR}/custom
	@lessc -x ./less/framework.less > ./css/framework.css
	@lessc -x ./less/framework-ie.less > ./css/framework-ie.css
	@echo "Compiling framework base less...             ${CHECK} Done"
	@lessc -x ${PROTOTYPE_LESS} > ./css/ualberta.css
	@lessc -x ./less/ualberta-ie.less > ./css/ualberta-ie.css
	@echo "Compiling ualberta institutional less...     ${CHECK} Done"
	@lessc -x ./less/faculty.less > ./css/faculty.css
	@lessc -x ./less/faculty-ie.less > ./css/faculty-ie.css
	@echo "Compiling faculty base less...               ${CHECK} Done"
	@cp -r ./css ${PRODDIR}
	@cp -r ./img ${PRODDIR}
	@cp -r ./ico ${PRODDIR}
	@cp -r ./font ${PRODDIR}
	@echo "Copying css, images, icons, and fonts...     ${CHECK} Done"
	@for file in `find ./less/custom -type f -name '*.less'`; do lessFilePath="$$file"; cssFilePath="$${lessFilePath/.\/less/.}"; cssFilePath="$${cssFilePath/%.less/.css}"; mkdir -p $$(dirname "$$cssFilePath"); lessc -x "$$lessFilePath" > "$$cssFilePath"; done
	@echo "Compiling custom less...                     ${CHECK} Done"
	@cp -r ./custom ${PRODDIR}
	@echo "Copying custom files...                      ${CHECK} Done"
	@cat js/bootstrap-collapse.js js/bootstrap-dropdown.js js/bootstrap-modal.js js/bootstrap-tooltip.js js/bootstrap-popover.js js/bootstrap-tab.js > ${PRODDIR}/js/bootstrap.js
	@uglifyjs -nc ${PRODDIR}/js/bootstrap.js > ${PRODDIR}/js/bootstrap.min.js
	@cp -r ./js ${PRODDIR}
	@echo "Minifying and copying javascript...          ${CHECK} Done"
	
#
# COMPILE GH-PAGES
#

ghpages:
	@mkdir -p ${PAGESDIR}
	@mkdir -p ${PAGESDIR}/html
	@mkdir -p ${PAGESDIR}/js
	@lessc -x ./less/framework.less > ./css/framework.css
	@lessc -x ./less/framework-ie.less > ./css/framework-ie.css
	@echo "Compiling framework base less...             ${CHECK} Done"
	@lessc -x ./less/ualberta.less > ./css/ualberta.css
	@lessc -x ./less/ualberta-ie.less > ./css/ualberta-ie.css
	@echo "Compiling ualberta institutional less...     ${CHECK} Done"
	@lessc -x ./less/faculty.less > ./css/faculty.css
	@echo "Compiling faculty base less...               ${CHECK} Done"
	@cp -r ./css ${PAGESDIR}
	@echo "Copying CSS to pages directory...            ${CHECK} Done"
	@cat js/bootstrap-alert.js js/bootstrap-button.js js/bootstrap-carousel.js js/bootstrap-collapse.js js/bootstrap-dropdown.js js/bootstrap-modal.js js/bootstrap-tooltip.js js/bootstrap-popover.js js/bootstrap-scrollspy.js js/bootstrap-tab.js js/bootstrap-typeahead.js js/bootstrap-affix.js > ${PAGESDIR}/js/bootstrap.js
	@uglifyjs -nc ${PAGESDIR}/js/bootstrap.js > ${PAGESDIR}/js/bootstrap.min.js
	@echo "Minifying and copying javascript...          ${CHECK} Done"
	@cp -r ./img ${PAGESDIR}
	@cp -r ./js/ualberta ${PAGESDIR}/js
	@cp -r ./font ${PAGESDIR}
	@cp -r ./html ${PAGESDIR}
	@echo "Copying html files...                        ${CHECK} Done"

push-gh-pages:
	(cd ../institutional-framework-pages; git add .; git commit -a -m pages; git push origin gh-pages)
	
push-production:
	(cd ../production; git add .; git commit -a -m prod; git push origin production)
	
faculty:
	@mkdir -p ../faculty
	@mkdir -p ../faculty/css
	@lessc -x ./less/framework.less > ../faculty/css/framework.css
	@lessc -x ./less/framework-ie.less > ../faculty/css/framework-ie.css
	@echo "Compiling framework base less...             ${CHECK} Done"
	@lessc -x ./less/faculty.less > ../faculty/css/faculty.css
	@lessc -x ./less/faculty-ie.less > ../faculty/css/faculty-ie.css
	@echo "Compiling faculty less files...     ${CHECK} Done"
	
homepage:
	@mkdir -p ./css
	@mkdir -p ../homepage
	@mkdir -p ../homepage/css
	@mkdir -p ../homepage/js
	@mkdir -p ../homepage/img
	@mkdir -p ../homepage/ico
	@mkdir -p ../homepage/font
	@lessc -x ./less/framework.less > ../homepage/css/framework.css
	@lessc -x ./less/framework-ie.less > ../homepage/css/framework-ie.css
	@echo "Compiling framework base less...             ${CHECK} Done"
	@lessc -x ./less/ualberta-homepage.less > ../homepage/css/ualberta-homepage.css
	@lessc -x ./less/ualberta-ie.less > ../homepage/css/ualberta-ie.css
	@echo "Compiling ualberta institutional less...     ${CHECK} Done"
	@cp -r ./img/homepage/ ../homepage/img/
	@cat ../homepage/css/ualberta-homepage.css ./css/explore-icons.css > ../homepage/css/homepage.css
	@cp ../homepage/css/homepage.css ../homepage/css/homepage-fluid-qa.css
	@cat ../homepage/css/framework-ie.css ../homepage/css/ualberta-ie.css > ../homepage/css/homepage-ie.css
	
homepage-preview:
	@mkdir -p ./css
	@mkdir -p ../homepage-preview
	@mkdir -p ../homepage-preview/css
	@mkdir -p ../homepage-preview/js
	@mkdir -p ../homepage-preview/img
	@mkdir -p ../homepage-preview/ico
	@mkdir -p ../homepage-preview/font
	@lessc -x ./less/framework.less > ../homepage-preview/css/framework.css
	@lessc -x ./less/framework-ie.less > ../homepage-preview/css/framework-ie.css
	@echo "Compiling framework base less...             ${CHECK} Done"
	@lessc -x ./less/ualberta-homepage.less > ../homepage-preview/css/ualberta-homepage.css
	@lessc -x ./less/ualberta-ie.less > ../homepage-preview/css/ualberta-ie.css
	@echo "Compiling ualberta institutional less...     ${CHECK} Done"
	@cp -r ./img/homepage/ ../homepage-preview/img/
	@cat ../homepage-preview/css/framework.css ../homepage-preview/css/ualberta-homepage.css ./css/explore-icons.css > ../homepage-preview/css/homepage.css
	@cat ../homepage-preview/css/framework-ie.css ../homepage-preview/css/ualberta-ie.css > ../homepage-preview/css/homepage-ie.css
	@cat ${PAGESDIR}/js/bootstrap.min.js ./js/ualberta/jquery.flexslider-min.js ./js/ualberta/jquery.tweet-min.js ./js/ualberta/institutional.js ./js/homepage/footer.js > ../homepage-preview/js/homepage-footer.js
	@cat ./js/homepage/head.js > ../homepage-preview/js/homepage-head.js
	@sed 's/publicas\/uofa\/css\//publicas\/uofa\/preview\/css\//g' ./html/homepage/index.html > ../homepage-preview/index.html
	@sed 's/publicas\/uofa\/css\//publicas\/uofa\/preview\/css\//g' ./html/homepage/index-optimized.html > ../homepage-preview/index-optimized.html
	

#
# WATCH LESS FILES
#

watch:
	@echo "Watching less files..."; \
	watchr -e "watch('less/.*\.less') { system 'make less' }"



.PHONY: watch ghpages less