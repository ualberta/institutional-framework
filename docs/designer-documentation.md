# Designer Documentation

 1. [Setup (Mac OSX)](#setup)
    + [Install Required Software](#install-required-software)
    + [Git Repository Setup](#git-repository-setup)
 2. Github and Code Modification Procedure
    + Repository Setup
    + Getting Code    
    + Modifying Code
    + Conflict Resolution   
 3. File / Folder Structure
    + Less File / Folder Structure
 4. Stylesheets and Modifying CSS
    + Using LESS
    + Compiling LESS Files Into CSS
    + Variables
    + Mixins
    + Providing Fallbacks For Older Browsers
    + Targeting Internet Explorer
 5. Make File
 6. Copying CSS to QA, Management, and Delivery Servers
 7. Changing the Homepage

----------

## Setup

### Install Required Software
You will need to install the following software on your computer to contribute to the Sitecore 3 Framework Design project.  The last two items on the list are only required if you wish to use a GUI instead of the command line.

- [xCode](https://developer.apple.com/xcode/)
    - If you are using xCode on Lion, after you install it you will have to go to "Preferences > Downloads", and click the install button beside "Command Line Tools".  This will install the tools required to run the make file.
- [nodejs](http://nodejs.org/)
- [Git command line application](http://code.google.com/p/git-osx-installer/downloads/list)
- [Github App](http://mac.github.com/) (Optional)
- [Less App](http://incident57.com/less/) (Optional)

#### Install Command Line Tools
After installing node.js, you will want to install the Less, JSHint, Recess, and uglify-js packages globally with the following command:

    npm install -g less jshint recess uglify-js

### Git Repository Setup

You will need the [git command line application](http://code.google.com/p/git-osx-installer/downloads/list) to continue.  

#### Git Configuration
First, you must do some git configuration.  Run these two commands in the terminal to tell git your username and email address:

    git config --global user.name "Your Name Here"
    git config --global user.email "your_email@ualberta.ca"

Next you will want to turn on OSX keychain support so you aren't required to type in your password on every commit:

    git config --global credential.helper osxkeychain

Now next time git needs your credentials you will have the option of storing the credentials in your keychain.  If you have problems completing the above steps, follow the [github guide](https://help.github.com/articles/set-up-git) for more details.

#### Create directories

Now that git is configured, you are ready to get the code.  To keep things clean, you will create a github folder where your repositories will live.  The folder structure will look like this:

    ./github/                              ## Github root folder in ~/Documents/
       |
       ----- /institutional-framework/     ## Institutional framework repository root
                 |
                 -----/master/             ## Master branch
                 |
                 -----/production/         ## Production branch
                 |
                 -----/gh-pages/           ## gh-pages branch

The following commands will create this folder structure:                

    mkdir -p ~/Documents/github/institutional-framework/
    cd ~/Documents/github/institutional-framework/
    mkdir master production gh-pages
    
#### Branches
 + **Master**: 
     + Contains all the latest files of the entire project.  Includes make, less, html, img, fonts, css, etc.
 + **Production** (optional): 
     + Contains the set of minified css, js, images, fonts, and icons to be used with the framework.  Pushes to the production branch should only be done after a QA check.
 + **gh-pages** (optional): 
     + Files pushed to this branch will be publicly viewable at `http://ualberta.github.com/institutional-framework/`.  This branch is a good place to push if you need a preview, but can't do so locally.
    
#### Clone the Master Branch
The master branch will contain the latest code, so all modifications should be based off of the master branch.

    cd ~/Documents/github/institutional-framework/master
    git clone git@github.com:ualberta/institutional-framework.git .
    
#### Clone the Production Branch - *optional*
You only need to set up this branch if you will ever push to the production branch.  Not all users will have permission to do this.

    cd ~/Documents/github/institutional-framework/production
    git clone git@github.com:ualberta/institutional-framework.git .
    git checkout origin/production -b production
    git branch -d master
    git branch -d gh-pages
    git branch

#### Clone the gh-pages Branch - *optional*
You only need to set up this branch if you need to publish the github hosted pages for the institutional-framework.

    cd ~/Documents/github/institutional-framework/gh-pages
    git clone git@github.com:ualberta/institutional-framework.git .
    git checkout origin/gh-pages -b gh-pages
    git branch -d master
    git branch -d production
    git branch

#### Github App Setup
If you prefer to use the GitHub App instead of the command line, you will need to setup the local master repository you just set up.  Note that if you choose to only use the app you will not be able to push to production / gh-pages branches properly. 

  1. Open the Github App
  2. Go to File > Add Local Repository
  3. Browse to Documents > github > insitutional-framework and choose the master folder.
  
----------

## Github and Code Modification Procedure

### Creating Your Development Branch
When modifying code you should always branch off the latest version of the master branch.  Your local copy of the master branch is at `~/Documents/github/institutional-framework/master/`.  First you will want to pull the latest version of the master branch:

    git pull origin master
    
This will get you the latest copy of the master branch from the github server.  Now you want to create your own local branch to make changes:

    git checkout -b my-branch-jan21
    
You are now free to edit any of the files in `~/Documents/github/institutional-framework/master/`, as you are now in the `my-branch-jan21` branch.

### Commit Your Changes
Once you have completed a task and **you have confirmed everything is working**, you will need to commit your changes to your current branch:

    git commit -a -m 'description of the changes made'

### Merge Into the Master Branch
When you have completed all the tasks you have intended on making to a branch, you will merge it back into the master branch, and delete your the development branch.

    git checkout master
    git merge my-branch-jan21
    git branch -d my-branch-jan21
    
### Conflict Resolution
To avoid conflicts, you should only have a branch checked out for as long as it takes to complete the task.  Having a branch open for a long period of time increases the risk that someone else will modify the same parts of a file that you are working on resulting in a conflict.  If you encounter a conflict, read [Basic Merge Conflicts](http://git-scm.com/book/en/Git-Branching-Basic-Branching-and-Merging#Basic-Merge-Conflicts) in the Git book to learn how to resolve the conflict.

----------

## File / Folder Structure (Master Branch)
Notable directories are listed below:

    ./master/                         ## root of the master branch
       |
       ----- /font/                   ## Fonts
       |
       ----- /ico/                    ## Icons
       |
       ----- /img/                    ## Images
       |
       ----- /js/                     ## Javascript
       |
       ----- /less/                   ## LESS (CSS)


### LESS File / Folder Structure
For organization purposes, `less` files have been broken up and categorized.  They are compiled into a minified CSS file when pushed to the production branch.

The less folder structure in the master branch will look like this:

    ./less/                           ## root of the master branch
       |
       ----- /faculty/                ## Contains all faculty specific less files
       |
       ----- /framework/              ## Contains all less files that pertain to the entire framework
       |
       ----- /ualberta/               ## Contains all institutional specific less files
       |
       ----- faculty.less             ## Master faculty less file (imports all less files in the /less/faculty folder)
       ----- faculty-ie.less          ## Master faculty IE file (compiles a separate CSS file with IE overrides, only loads in IE)
       ----- framework.less           ## Master framework less file
       ----- framework-base.less      ## Master framework base (use for campaigns, and sites that will have a largely different design)
       ----- framework-ie.less        ## Master framework IE file (compiles IE overrides to separate file)
       ----- ualberta.less            ## Master institutional less file (imports all less files in /less/ualberta/)
       ----- ualberta-ie.less         ## Master institutional IE file (compiles IE overrides to separate file)

All less files in the `/less/` root directory will compile into a CSS file.  All files inside the folders should **not** be individually compiled, as the less master files import the required files from the folders.

----------

## Stylesheets and Modifying CSS
Here are some important things to remember:

  + **Do not edit CSS files**: CSS files are compiled from the LESS files, if you change a CSS file it will be overwritten 
  + **Only push/merge changes into the master branch**: The other branches are built through a MakeFile from the master branch, so we never pull from the other branches to get updates.  Any changes you make to branches that are not master will be overwritten. 

### Using LESS
Less is very similar to CSS, with a few added features that can simplify coding for the designer.  You should read the [official LESS documentation](http://lesscss.org/#docs) if you are not familiar with LESS.  Here are a few features we frequently use:

#### Compiling LESS Files Into CSS
The first step in modifying the design files is to learn how to compile the less files.  After you modify a less file, you will need to compile them into a CSS file.  There are two ways you can do this:

##### Option 1: LESS App (GUI)
If you prefer a GUI, you can use the [Less App](http://incident57.com/less/).  Once installed, start the program and open the `~/Documents/github/institutional-framework/master/less` folder.  You will need to uncheck everything except the master compile files.  You will need to set a CSS output directory on the master files.  Set the output directory to `~/Documents/github/institutional-framework/master/css`.

##### Option 2: Command Line
Compiling the LESS files can be easily done using the MakeFile.  Simply go to the `/master` directory and type the following command:

    make less
    
This will compile the master CSS files and output them to the `/css` directory.  There are other triggers in the make file that may be useful.

#### Variables
If there is a specific color or parameter that you are going to re-use multiple times, you should create a variable for it.  Do this in the `/less/framework/base/variables.less` file.

    @ualbertaGreen: #007c41;
    
    // Now you can use the variable wherever you like
    a { color: @ualbertaGreen; }

#### Mixins
Mixins are like shortcuts when building CSS.  First you build a mixin, and then you can use it anywhere in your CSS.  Here is a box-shadow example:

With CSS only, you would need to add the browser specific prefixes when creating a box shadow:

    .container {
              box-shadow: 1px 1px 1px #000;
         -moz-box-shadow: 1px 1px 1px #000; 
      -webkit-box-shadow: 1px 1px 1px #000;
    }

With LESS, you can create a mixin for a box shadow, and use it throughout the LESS files, so you only need to write one line every time you create a box shadow:
    
    // MIXIN
    .box-shadow(@shadow) {
              box-shadow: @shadow;
         -moz-box-shadow: @shadow; 
      -webkit-box-shadow: @shadow;
    }
    
    .container {
      .box-shadow(1px 1px 1px #000);
    }
    
There are several mixins within the framework that are at your disposal.  All available mixins are in the `/less/framework/base/mixins.less` files.

#### Providing Fallbacks for Older Browsers
The framework takes advantage of CSS3 features as often as possible, but in some cases older browsers will not support these features.  In that case it is important to provide a fallback for the older browser to ensure the page still displays properly.  

Modernizr is used to detect which features the browser supports, and it adds classes based on the feature support to the `<html>` tag.  For example, if you were using a CSS3 gradient, you could provide a fallback background gradient image for browsers that do not support CSS3 gradients:

    .no-cssgradients {
      .gradient-bar { background: url(gradient.png) repeat-x top left; }
    }
    
View the [Modernizr Documentation](http://modernizr.com/docs/#features-css) for a full list of features detected and the associated classes that are added to the `<html>` tag.
    
Every project folder inside the `/less/` folder will have a `fallbacks.less` file where these fallbacks are specified.  Here are some examples:

  + `/less/framework/fallbacks.less` - Fallbacks specified in this file will apply to any site build using the framework (faculty, institutional, etc)
  + `/less/ualberta/fallbacks.less` - Fallbacks specified here apply to institutional only
  + `/less/faculty/fallbacks.less` - Fallbacks specified here apply to faculty pages only
  
#### Targeting Internet Explorer
Targeting Internet Explorer is done in a similar way to the fallbacks.  Note that any display issues that happen because Internet Explorer does not support a specific feature should be fixed in a `fallbacks.less` file.  Issues fixed in the `ie.less` files should only be display issues specific to different versions of Internet Explorer.

Depending on which version of Internet Explorer the user is using, there will be different classes that are added to the `<html>` class:

<table>
  <thead>
    <tr>
      <th>Browser</th>
      <th>Classes Added To <code>&lt;html&gt;</code> Tag</th>    
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Internet Explorer 7</td>
      <td>lt-ie10 lt-ie9 lt-ie8 ie7</td>
    </tr>
    <tr>
      <td>Internet Explorer 8</td>
      <td>lt-ie10 lt-ie9 ie8</td>
    </tr>
    <tr>
      <td>Internet Explorer 9</td>
      <td>lt-ie10 ie9</td>
    </tr>
    <tr>
      <td>Internet Explorer 10</td>
      <td>ie10</td>
    </tr>
  </tbody>
</table>
**All additions to an `ie.less` file MUST be wrapped in one of the classes from the above table.**

You can use any of the above classes to target various versions of Internet Explorer in the same manner you would target features in the `fallbacks.less` file.  Every project should have its own IE file:

  + `/less/framework/ie.less` - IE styling specified in this file will apply to any site build using the framework (faculty, institutional, etc)
  + `/less/ualberta/ie.less` - IE styling specified here apply to institutional only
  + `/less/faculty/ie.less` - IE styling specified here apply to faculty pages only
  
## Using the MakeFile
Using the MakeFile you are able to execute various commands that will automate some tedious tasks for you.  The available triggers for the make file are described below:

  + `make less` - Compiles all of the less master files into the ./css/ directory in the repository.
  + `make homepage` - Compiles and copies ualberta.ca html/css to the homepage directory
  + `make production` - Compiles all code in the repository an pushes it to the production branch of the repository
  + `make ghpages` - Compiles all code in the repository an pushes it to the gh-pages branch of the repository

In order to be able to execute these commands, you will need to have followed the steps in the Setup section.

## Copying CSS to QA, Content Management, and Content Delivery Servers
There are three different environments where the css from the institutional-framework repository will live:

	+ **QA**: This environment is for testing.  Any large changes to the code base should be tested in this environment before copying to content management or delivery.
	+ **Content Management**: This is the environment where all content editing happens.  Any code pushed to this environment will be visible to anyone using Sitecore 3 on their preview URL (ie: https://sitename.sitecore.ualberta.ca/).
	+ **Content Delivery**: This environment is where the code for the live site lives.  **Never upload untested code to this environment**
	
Only the University Digital Strategy team can push css to these environments. If you are part of the University Digital Strategy team, refer to the internal documentation for the procedure to push to the above environments.

## Changes to the UAlberta.ca Homepage
The ualberta.ca homepage is the `/html/institutional-home.html` file in the repository.  Edit this file, and when you are ready to preview the changes run this command in the `~/Documents/github/institutional-framework/master` directory:

		make homepage
		
This will compile all of the files required for the homepage into the `~/Documents/github/institutional-framework/homepage` directory.  This will name the index file `index-preview.html`, so you can easily upload and preview the file.  After going through the necessary testing phases, you can overwrite the index file on the server with your new homepage files.


## Todo
The following sections still need to be added to this document:
  + Setup (Windows)
  + Using the Github App (Video Tutorial)
  + Using the LESS App (Video Tutorial)
