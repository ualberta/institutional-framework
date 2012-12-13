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
	@recess --compile ${BOOTSTRAP_LESS} > ${BOOTSTRAP}
	@recess --compile ./less/ualberta-ie7.less > ./compiled/css/ualberta-ie7.css
	@echo "Compiling LESS with Recess...               ${CHECK} Done"
	
	
#
# COMPILE PRODUCTION BRANCH
#

production:
	@lessc -x ./less/framework.less > ./css/framework.css
	@lessc -x ./less/framework-ie.less > ./css/framework-ie.css
	@echo "Compiling framework base less...             ${CHECK} Done"
	@lessc -x ${PROTOTYPE_LESS} > ./css/ualberta.css
	@lessc -x ./less/ualberta-ie.less > ./css/ualberta-ie.css
	@echo "Compiling ualberta institutional less...     ${CHECK} Done"
	@lessc -x ./less/faculty.less > ./css/faculty.css
	@echo "Compiling faculty base less...               ${CHECK} Done"
	@mkdir -p ${PRODDIR}
	@mkdir -p ${PRODDIR}/css
	@mkdir -p ${PRODDIR}/img
	@cp -r ./css ${PRODDIR}
	@cp -r ./img ${PRODDIR}
	@echo "Copying css and images...                   ${CHECK} Done"
	@cat js/bootstrap-alert.js js/bootstrap-button.js js/bootstrap-carousel.js js/bootstrap-collapse.js js/bootstrap-dropdown.js js/bootstrap-modal.js js/bootstrap-tooltip.js js/bootstrap-popover.js js/bootstrap-scrollspy.js js/bootstrap-tab.js js/bootstrap-typeahead.js js/bootstrap-affix.js > ${PRODDIR}/js/bootstrap.js
	@uglifyjs -nc ${PRODDIR}/js/bootstrap.js > ${PRODDIR}/js/bootstrap.min.js
	@mkdir -p ${PRODDIR}/js
	@cp -r ./js ${PRODDIR}
	@echo "Minifying and copying javascript...         ${CHECK} Done"
	(cd ../production; git add .; git commit -a -m prod; git push origin production --force)
	
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
	@cp ./*.html ${PAGESDIR}/
	@cp -r ./img ${PAGESDIR}
	@cp -r ./font ${PAGESDIR}
	@cp -r ./html ${PAGESDIR}
	@mv ${PAGESDIR}/homepage.html ${PAGESDIR}/index.html
	@echo "Copying html files...                        ${CHECK} Done"

push-gh-pages:
	(cd ../institutional-framework-pages; git add .; git commit -a -m pages; git push origin gh-pages)
	
push-production:
	(cd ../production; git add .; git commit -a -m prod; git push origin production)

#
# WATCH LESS FILES
#

watch:
	@echo "Watching less files..."; \
	watchr -e "watch('less/.*\.less') { system 'make less' }"



.PHONY: watch ghpages less