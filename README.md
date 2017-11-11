## Website Performance Optimization portfolio project
For more information about the Udacity course please see [Website Performance Optimization](https://classroom.udacity.com/courses/ud884)using Google PageSpeed

### Quick start instructions
1. Download or clone this repository
1. cd /path/to/your-project-folder
1. Install dependancies

```bash
$> npm install
```
4. Optimize resources

```bash
$> gulp
```
5. Serve app from HTTP server

```bash
$> cd dist
$> python -m SimpleHTTPServer 8080
```


### Release notes

#### index.html
1. Render blocking javascript moved near end of file.
1. Images served localy instead of remotely.
1. Media query added to some css.
1. Render blocking css moved near end of file.

#### views/main.js
1. resizePizzas function optimized by not iterating over expensive calculations. Pizzas now resize in less than 5ms on most hardware.
1. Eliminated jank when scrolling by using requestAnimationFrame. Page now renders under 60fps.

### Build tools
 There are several tasks available in the gulpfile.js. If gulp is called with no arguments it defaults to the following tasks: minify-css, inlineCss, images, minifyjs, minify-html.

 ##### clean
   Removes all artifacts (images, css, js, images) from their corresponding dist sub-directory.

 ##### minify-html
   Minifys .html files found in build directory

 ##### minify-css
   Minifys .css files

 ##### minify-js
   Minifys .js files

 ##### inlineCss
   Automaticaly add css inline into html file for .html files in root directory. Artifacts placed in build directory for minification

 ##### images
   Optimizes image sizes

 - clean
   Removes all artifacts (images, css, js, images) from their corresponding dist sub-directory.
