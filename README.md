<p align="center">
  <a href="https://getbootstrap.com/">
    <img src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png" alt="Bootstrap logo" width="200" height="165">
  </a>
</p>

<h3 align="center">Bootstrap</h3>

<p align="center">
  Sleek, intuitive, and powerful front-end framework for faster and easier web development.
  <br>
  <a href="https://getbootstrap.com/docs/5.3/"><strong>Explore Bootstrap docs »</strong></a>
  <br>
  <br>
  <a href="https://github.com/twbs/bootstrap/issues/new?assignees=-&labels=bug&template=bug_report.yml">Report bug</a>
  ·
  <a href="https://github.com/twbs/bootstrap/issues/new?assignees=&labels=feature&template=feature_request.yml">Request feature</a>
  ·
  <a href="https://themes.getbootstrap.com/">Themes</a>
  ·
  <a href="https://blog.getbootstrap.com/">Blog</a>
</p>


## Bootstrap 5.3.8 for the Impulsion src2html boilerplate

- Enabled negative margins.
- More spacer utility classes.
- Added `xxxl` breakpoint at 1600px, with a 1520px container width.
- Additional font size utility classes.
- Primary color `#6fc2b1` and secondary color `#f4ac63`.

### Extension reference

See [CUSTOMIZATIONS.md](CUSTOMIZATIONS.md) for every custom value, spacing and
typography tables, responsive examples, container behavior, Sass import order,
and bundle coverage.

The custom defaults live in [settings](scss/impulsion/_settings.scss), with
spacing, breakpoint, container, and font-size extensions in
[maps](scss/impulsion/_maps.scss). Bootstrap's core `_variables.scss` remains
unchanged from upstream.

### Build and verify

Use Node.js 22 or newer. On Windows PowerShell, use `npm.cmd` if execution policy
blocks `npm.ps1`.

```sh
npm ci
npm run dist
npm run css-test
npm run test-impulsion
npm run js-test
```

Generated files in `dist/` and `js/dist/` are ignored by Git. Build them before
consuming or packaging this fork. `test-impulsion` checks the built CSS, including
minified and RTL variants; run it after `npm run dist` or `npm run css`.

### Future upgrades

1. Save local changes and create an upgrade branch.
2. Fetch `upstream` and merge the desired stable release tag.
3. Preserve the Impulsion partials and their imports in `bootstrap.scss`,
   `bootstrap-grid.scss`, `bootstrap-utilities.scss`, and `bootstrap-reboot.scss`.
4. Keep generated bundles untracked if the upstream merge reports modify/delete
   conflicts for them, then rebuild them from the merged source.
5. Run the checks above and review representative application pages at breakpoint
   boundaries, including `1599px` and `1600px`.
