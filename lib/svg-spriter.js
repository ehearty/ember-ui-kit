const Plugin = require('broccoli-caching-writer');
const Spriter = require('svg-sprite');
const RSVP = require('rsvp');
const File = require('vinyl');

const fs = require('fs-extra');
const path = require('path');
const klaw = require('klaw-sync');

module.exports = class SVGSpriter extends Plugin {
  constructor(tree, options) {
    super([ tree ], options);

    this.options = options || {};
  }

  build() {
    let inputPath = this.inputPaths[0];
    let outputPath = path.join(this.outputPath, 'assets/icons.svg');

    return new RSVP.Promise((resolve, reject) => {
      let spriter = new Spriter({
        srcDir: inputPath,
        shape: this.options.shape || {
          spacing: {
            padding: 1,
            box: 'content'
          }
        },
        mode: {
          defs: {
            bust: false
          }
        }
      });

      klaw(inputPath)
        .filter(file => file.stats.isFile() && path.extname(file.path) === '.svg')
        .forEach(({ path: filePath }) => {
          spriter.add(new File({
            path: filePath,
            base: inputPath,
            contents: fs.readFileSync(filePath)
          }));
        });

      // Compile the sprite
      spriter.compile((error, result) => {
        if (error) {
          reject(error);
        }
        else {
          let contents = result.defs.sprite.contents;

          fs.outputFileSync(outputPath, contents);

          resolve();
        }
      });
    });
  }
}
