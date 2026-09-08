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

### Extended spacer utility classes.
Extended Bootstrap's spacing scale beyond `5` through `15`, with additional pixel sizes.
These values generate margin, padding, gap, and gutter classes, plus negative margins.
The default `$spacer` is `1rem`; pixel equivalents below assume a 16px root font size.

    6: $spacer * 4,
    7: $spacer * 5,
    8: $spacer * 6,
    9: $spacer * 7,
    10: $spacer * 8,
    11: $spacer * 9,
    12: $spacer * 10,
    13: $spacer * 11,
    14: $spacer * 12,
    15: $spacer * 13,
    10px: 10px,
    20px: 20px,
    30px: 30px,
    40px: 40px,
    50px: 50px,
    60px: 60px,
    70px: 70px,
    80px: 80px,
    90px: 90px,
    100px: 100px,
    125px: 125px,
    150px: 150px
Example usage:

    class="mt-6" // margin-top: 4rem (64px at a 16px root font size);
    class="mt-60px" // margin-top: 60px;
    class="mt-n6" // margin-top: -4rem (-64px at a 16px root font size);
    class="mt-n60px" // margin-top: -60px;

### Added breakpoint for 1600px
Use `*-xxxl-*` for >=1600px breakpoint.

At this breakpoint, `.container` and the responsive container classes through
`.container-xxxl` have a maximum width of `1520px`. `.container-xxxl` stays fluid
below `1600px`, and `.container-fluid` stays fluid at every viewport width.
The existing `xxl` container maximum remains `1320px` from `1400px` up to (but below) `1600px`.

Example usage:

    class="col-xxxl-6" // width: 50%; @media (min-width: 1600px)
    class="mt-xxxl-60px" // margin-top: 60px; @media (min-width: 1600px)

### Additional font size utility classes.
*The last two* `fs-*` *classes were added later, which explains the inconsistency in naming.*

    fs-7 // font-size: 0.875rem (14px)
    fs-8 // font-size: 0.75rem (12px)
    fs-sm // font-size: 0.9375rem (15px)
    fs-md // font-size: 1.125rem (18px)


Changed the `display-6` target font size from **2.5rem** to **2.75rem**.
Bootstrap's `fs-1` target font size is **2.5rem**. Both use Bootstrap's responsive
font sizing (RFS), reaching these sizes at viewports of `1200px` and wider.

### Customization files

- `scss/impulsion/_settings.scss`: theme colors and negative-margin defaults.
- `scss/impulsion/_maps.scss`: spacing, breakpoints, containers, and font sizes.

All four Sass entry points load settings before Bootstrap's variables, then merge
the custom maps after variables and before Bootstrap's derived maps. Keep this
order so negative margins, gutters, components, and responsive utilities use the
extended values. Bootstrap's core `_variables.scss` remains unchanged from upstream.

Projects that previously imported `_variables.scss` directly must now also import
the Impulsion partials in this order:

```scss
@import "scss/functions";
@import "scss/impulsion/settings";
@import "scss/variables";
@import "scss/variables-dark";
@import "scss/impulsion/maps";
@import "scss/maps";
// Continue with mixins, utilities, and the components needed by the project.
```

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
