export function configure(aurelia) {  
  aurelia.use
    .standardConfiguration()
    // enable debug logging to see aurelia-computed's messages.
    .developmentLogging()
    // install the plugin
    .plugin('aurelia-computed');

  aurelia.start().then(a => a.setRoot());
}