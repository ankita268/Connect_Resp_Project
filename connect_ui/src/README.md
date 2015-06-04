# connectui

This is initial responsive UI development architecture setup project.

## Tools Installation

### Node and NPM

Check if you have Node and NPM already installed by typing below commands.

```
$ node --version && npm --version
```

If you need to upgrade or install Node, the easiest way is to use an installer for your platform. Download the .msi for Windows or .pkg for Mac from the NodeJS website mentioned below.

http://nodejs.org/download/

### Yeoman toolset 

Once you’ve got Node installed, install the Yeoman toolset:

```
$npm install --global yo bower grunt-cli
```

### Confirm the installation by typing below command:

```
$ yo --version && bower --version && grunt --version
```

### Git

You can check if you have Git installed by typing: $ git --version

If you don't have a Git, install it from http://git-scm.com/.

### Get this project in your workspace

#### Configure Git for the first time

```
git config --global user.name "Jigar Thakkar"
git config --global user.email "jthakkar@bridge-x.com"
```
Replace user.name and user.email with your details.

#### Working with your repository
Go to your working directory. For example:

```
$ cd D:\my-work-dir
$ git clone http://jthakkar@174.129.37.103:7990/scm/~jthakkar/connect-responsive-ui.git
```

Replace first "jthakkar" with your username.

#### After receiving above project install all dependencies.

NPM

```
npm install
```

Bower

```
bower install
```

Now your workspace is ready for real stuff...! 

#### Cloning branch and pushing it to git

List the branches available on remote
 
```
git fetch origin
```

Check list of branches available

```
git branch -v -a
```

Check out remote branch to your local branch.

```
git checkout -b responsive-ui remotes/origin/feature/responsive-ui-init
```

Push your changes to git

```
git push origin reponsive-ui
```

You can check local file status with below command

```
git status
```


#### For daily git usage follow below below link.

https://confluence.atlassian.com/display/STASH0210/Basic+Git+commands

## Build & development

### Run `grunt` for building and `grunt serve` for preview.

```
$ grunt
```

```
$ grunt serve
```

### Generate Distributable and run it

Run `grunt serve:dist`

```
$ grunt serve:dist
```

### Testing

Running `grunt test` will run the unit tests with karma.

```
$ grunt test
```

## Code Style Guide

Refer: https://github.com/johnpapa/angular-styleguide

