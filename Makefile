BOOTSTRAP = ./docs/assets/css/bootstrap.css
BOOTSTRAP_LESS = ./less_docs/bootstrap.less
BOOTSTRAP_RESPONSIVE = ./docs/assets/css/bootstrap-responsive.css
BOOTSTRAP_RESPONSIVE_LESS = ./less_docs/responsive.less
PROTOTYPE = ./prototype/css/ualberta.css
PROTOTYPE_LESS = ./less/ualberta.less
PAGESDIR = ../institutional-framework-pages
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
	@recess --compile ${BOOTSTRAP_RESPONSIVE_LESS} > ${BOOTSTRAP_RESPONSIVE}
	@echo "Compiling LESS with Recess...               ${CHECK} Done"
	@node docs/build
	@cp img/* docs/assets/img/
	@cp js/*.js docs/assets/js/
	@cp js/tests/vendor/jquery.js docs/assets/js/
	@echo "Compiling documentation...                  ${CHECK} Done"
	@cat js/bootstrap-transition.js js/bootstrap-alert.js js/bootstrap-button.js js/bootstrap-carousel.js js/bootstrap-collapse.js js/bootstrap-dropdown.js js/bootstrap-modal.js js/bootstrap-tooltip.js js/bootstrap-popover.js js/bootstrap-scrollspy.js js/bootstrap-tab.js js/bootstrap-typeahead.js js/bootstrap-affix.js > docs/assets/js/bootstrap.js
	@uglifyjs -nc docs/assets/js/bootstrap.js > docs/assets/js/bootstrap.min.tmp.js
	@echo "/**\n* Bootstrap.js v2.1.1 by @fat & @mdo\n* Copyright 2012 Twitter, Inc.\n* http://www.apache.org/licenses/LICENSE-2.0.txt\n*/" > docs/assets/js/copyright.js
	@cat docs/assets/js/copyright.js docs/assets/js/bootstrap.min.tmp.js > docs/assets/js/bootstrap.min.js
	@rm docs/assets/js/copyright.js docs/assets/js/bootstrap.min.tmp.js
	@echo "Compiling and minifying javascript...       ${CHECK} Done"
	@echo "\n${HR}"
	@echo "Bootstrap successfully built at ${DATE}."
	@echo "${HR}\n"
	@echo "Thanks for using Bootstrap,"
	@echo "<3 @mdo and @fat\n"
	
#
# COMPILE PROTOTYPE
#

prototype:
	@recess --compile ${PROTOTYPE_LESS} > ${PROTOTYPE}
	@recess --compile ./prototype/less/ualberta-ie7.less > ./prototype/css/ualberta-ie7.css
	@recess --compile ./prototype/less/ualberta-ie.less > ./prototype/css/ualberta-ie-less.css
	@echo "Compiling LESS with Recess...               ${CHECK} Done"
	@cat js/bootstrap-alert.js js/bootstrap-button.js js/bootstrap-carousel.js js/bootstrap-collapse.js js/bootstrap-dropdown.js js/bootstrap-modal.js js/bootstrap-tooltip.js js/bootstrap-popover.js js/bootstrap-scrollspy.js js/bootstrap-tab.js js/bootstrap-typeahead.js js/bootstrap-affix.js > prototype/js/bootstrap.js
	@uglifyjs -nc prototype/js/bootstrap.js > prototype/js/bootstrap.min.js

	
#
# COMPILE GH-PAGES
#

ghpages:
	@recess --compile ${PROTOTYPE_LESS} > ./css/ualberta.css
	@recess --compile ./less/ualberta-ie7.less > ./css/ualberta-ie7.css
	@recess --compile ./less/ualberta-ie.less > ./css/ualberta-ie-less.css
	@cp ./css/*.css ${PAGESDIR}/css/
	@echo "Compiling LESS with Recess...               ${CHECK} Done"
	@cat js/bootstrap-alert.js js/bootstrap-button.js js/bootstrap-carousel.js js/bootstrap-collapse.js js/bootstrap-dropdown.js js/bootstrap-modal.js js/bootstrap-tooltip.js js/bootstrap-popover.js js/bootstrap-scrollspy.js js/bootstrap-tab.js js/bootstrap-typeahead.js js/bootstrap-affix.js > ${PAGESDIR}/js/bootstrap.js
	@uglifyjs -nc ${PAGESDIR}/js/bootstrap.js > ${PAGESDIR}/js/bootstrap.min.js
	@echo "Minifying and copying javascript...               ${CHECK} Done"
	@cp ./*.html ${PAGESDIR}/
	@mv ${PAGESDIR}/homepage.html ${PAGESDIR}/index.html
	@echo "Copying html files...               ${CHECK} Done"

#
# WATCH LESS FILES
#

watch:
	echo "Watching less files..."; \
	watchr -e "watch('less/.*\.less') { system 'make' }"

#
# HAUNT GITHUB ISSUES 4 FAT & MDO ONLY (O_O  )
#

haunt:
	@haunt .issue-guidelines.js https://github.com/twitter/bootstrap


.PHONY: docs watch gh-pages prototype