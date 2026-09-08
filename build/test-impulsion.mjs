import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import postcss from 'postcss'

const breakpoints = new Map([
  ['', 0],
  ['sm', 576],
  ['md', 768],
  ['lg', 992],
  ['xl', 1200],
  ['xxl', 1400],
  ['xxxl', 1600]
])
const spacers = new Map([
  ['6', '4rem'],
  ['7', '5rem'],
  ['8', '6rem'],
  ['9', '7rem'],
  ['10', '8rem'],
  ['11', '9rem'],
  ['12', '10rem'],
  ['13', '11rem'],
  ['14', '12rem'],
  ['15', '13rem'],
  ...[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150].map(size => [`${size}px`, `${size}px`])
])

const normalize = value => value.replace(/\s+/g, '').replace(/\b0\./g, '.')
const mediaAt = width => width ? `(min-width:${width}px)` : ''

function indexRules(css) {
  const index = new Map()
  postcss.parse(css).walkRules(rule => {
    const media = []
    for (let { parent } = rule; parent; parent = parent.parent) {
      if (parent.type === 'atrule' && parent.name === 'media') {
        media.unshift(normalize(parent.params))
      }
    }

    for (const selector of rule.selectors) {
      const key = `${media.join('|')}|${selector}`
      const declarations = index.get(key) || new Map()
      rule.walkDecls(declaration => {
        declarations.set(declaration.prop, normalize(declaration.value) + (declaration.important ? '!important' : ''))
      })
      index.set(key, declarations)
    }
  })
  return index
}

function expectDeclaration(index, selector, property, value, width = 0) {
  assert.equal(index.get(`${mediaAt(width)}|${selector}`)?.get(property), normalize(value), `${selector} / ${property} at ${width}px`)
}

for (const bundle of ['bootstrap', 'bootstrap-grid', 'bootstrap-utilities', 'bootstrap-reboot']) {
  for (const variant of ['', '.min', '.rtl', '.rtl.min']) {
    test(`${bundle}${variant}.css preserves the Impulsion contract`, () => {
      const css = readFileSync(new URL(`../dist/css/${bundle}${variant}.css`, import.meta.url), 'utf8')
      assert.match(css, /Bootstrap[^\n]*v5\.3\.8/)
      const index = indexRules(css)
      const expect = (...args) => expectDeclaration(index, ...args)

      if (bundle !== 'bootstrap-grid') {
        expect(':root', '--bs-primary', '#6fc2b1')
        expect(':root', '--bs-secondary', '#f4ac63')
        expect(':root', '--bs-primary-rgb', '111,194,177')
        expect(':root', '--bs-secondary-rgb', '244,172,99')
      }

      if (bundle === 'bootstrap-reboot') {
        return
      }

      for (const [breakpoint, width] of breakpoints) {
        const infix = breakpoint ? `${breakpoint}-` : ''
        for (const [size, value] of spacers) {
          expect(`.mt-${infix}${size}`, 'margin-top', `${value}!important`, width)
          expect(`.mt-${infix}n${size}`, 'margin-top', `-${value}!important`, width)
          expect(`.p-${infix}${size}`, 'padding', `${value}!important`, width)
          if (bundle !== 'bootstrap-grid') {
            expect(`.gap-${infix}${size}`, 'gap', `${value}!important`, width)
          }

          if (bundle !== 'bootstrap-utilities') {
            expect(`.g-${infix}${size}`, '--bs-gutter-x', value, width)
            expect(`.g-${infix}${size}`, '--bs-gutter-y', value, width)
          }
        }
      }

      const start = variant.includes('rtl') ? 'right' : 'left'
      expect('.ms-xxxl-n60px', `margin-${start}`, '-60px!important', 1600)
      expect('.ps-xxxl-60px', `padding-${start}`, '60px!important', 1600)
      expect('.d-xxxl-none', 'display', 'none!important', 1600)

      if (bundle !== 'bootstrap-utilities') {
        for (const selector of ['.container', '.container-sm', '.container-md', '.container-lg', '.container-xl', '.container-xxl', '.container-xxxl']) {
          expect(selector, 'max-width', '1520px', 1600)
        }

        expect('.container', 'max-width', '1320px', 1400)
        expect('.container-xxxl', 'width', '100%')
        assert.equal(index.get(`${mediaAt(1400)}|.container-xxxl`)?.has('max-width'), undefined)
        assert.equal(index.get(`${mediaAt(1600)}|.container-fluid`)?.has('max-width'), undefined)
        expect('.col-xxxl-6', 'width', '50%', 1600)
        expect('.col-xxxl', 'flex', '1 0 0', 1600)
      }

      if (bundle !== 'bootstrap-grid') {
        for (const [size, value] of [['7', '.875rem'], ['8', '.75rem'], ['sm', '.9375rem'], ['md', '1.125rem']]) {
          expect(`.fs-${size}`, 'font-size', `${value}!important`)
        }

        expect('.fs-1', 'font-size', '2.5rem!important', 1200)
      }

      if (bundle === 'bootstrap') {
        expect('.display-6', 'font-size', '2.75rem', 1200)
      }
    })
  }
}
