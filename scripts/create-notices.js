const fs = require('fs');
const path = require('path');

function createNotices() {
  const noticeDir = path.join(__dirname, '..', 'src', 'assets', 'notices');
  const contents = fs.readdirSync(noticeDir);

  const notices = contents
    .filter(content => {
      const stat = fs.statSync(path.join(noticeDir, content));

      return stat.isDirectory();
    })
    .map(content => {
      const indexDir = path.join(noticeDir, content, 'index.md');
      const metaDir = path.join(noticeDir, content, 'meta.json');

      const index = fs.readFileSync(indexDir, {encoding: 'utf-8'});
      const meta = fs.readFileSync(metaDir, { encoding: 'utf-8' });

      /**
       * @type {{
       *   noticeDate: Date,
       *   contents: string,
       *   title: string,
       * }}
       */
      const metaObject = JSON.parse(meta);

      metaObject.contents = index;

      return metaObject;
    })
    .sort((a, b) => {
      return new Date(b.noticeDate).valueOf() - new Date(a.noticeDate).valueOf();
    });

  fs.writeFileSync(path.join(noticeDir, 'notices.json'), JSON.stringify(notices), { encoding: 'utf-8' });
}

createNotices();
