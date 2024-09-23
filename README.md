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


## Bootstrap 5.3.3 for Impulsion src2html boilerplate.

- Enabled negative margins.
- More spacer utility classes.
- Added breakpoint for 1600px.
- Additional font size utility classes.

### Extended spacer utility classes. 
Extended Bootstrap spacer classes, which are limited from *-5 to *-15.   
Additionally, classes with pixel units have been added.  
1rem = 16px  
$spacer = 1rem  

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
    
    class="mt-6" // margin-top: 46px;
    class="mt-60px" // margin-top: 60px;
    class="mt-n6" // margin-top: -46px;
    class="mt-n60px // marign-top: -60px;

### Added breakpoint for 1600px
Use `*-xxxl-*` for >=1600px breakpoint. 

Example usage: 

    class="col-xxxl-6" // width: 50%; @media (min-width: 1600px)
    class="mt-xxxl-60px" // margin-top: 60px; @media (min-width: 1600px)

### Additional font size utility classes.
*The last two* `fs-*` *classes were added later, which explains the inconsistency in naming.* 

    fs-7 // font-size: 0.875rem (14px)
    fs-8 // font-size: 0.75rem (12px)
    fs-sm // font-size: 0.9375 (15px)
    fs-md // font-size: 1.125 (18px)
 

Changed `display-6` class font size from **2.5rem** to **2.75rem**.  
Use Bootstrap's `fs-1` class for **2.5rem** font size. 
