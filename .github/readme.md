<h3>new-tab</h3>
<p>
  Repository for my custom <a href="https://www.mozilla.org/firefox">Firefox</a> home page & new tab page.  
</p>
<p>
  Heavily inspired by <a href="https://github.com/KorySchneider/tab">KorySchneider/tab</a>.
</p>

<h3>Preview</h3>
<p>You can see the live preview <a href="https://azhimn.github.io/new-tab/">here</a>.</p>
<p>
  In this preview image, I use <a href="https://github.com/andreasgrafen/cascade">andreasgrafen/cascade</a> as <a href="https://www.mozilla.org/firefox">Firefox</a> userChrome.css theme.
</p>
<img src="./assets/preview.gif" alt="preview image">

<h3>Commands</h3>
<p>new-tab supports commands.</p>
<p>As of now, only following commands are supported.</p>
<ul>
  <li>
    <code>!arch</code> To open <a href="https://archlinux.org">Arch Linux website</a> or search <a href="https://wiki.archlinux.org">Arch Linux Wiki</a>
  </li>
  <li>
    <code>!gh</code> To open or search <a href="https://github.com">GitHub</a>
  </li>
  <li>
    <code>!w</code> To open or search <a href="https://wikipedia.org">Wikipedia</a>
  </li>
  <li>
    <code>!yt</code> To open or search <a href="https://youtube.com">YouTube</a>.
  </li>
</ul>
<br>
<ul>
  <li>
    <code>!cfg style [property] [value]</code> To change <code>new-tab</code> colors.
    <br>Available properties: <code>background</code>, <code>primary</code> (text), <code>accent</code> (code/highlight).
    <br>Value must be filled with hex color code, e.g. <code>#FFF</code> or <code>#FEFEFE</code>.
  </li>
</ul>
<br>
<ul>
  <li>
    <code>!cfg engine [value]</code> To change search engine.
    <br>Available search engines values: <code>bing</code>, <code>ddg</code>, <code>google</code>, <code>yandex</code>
  </li>
</ul>