// test cases are from https://github.com/greyblake/whatlang-rs/blob/master/tests/detect.rs
import * as fs from 'node:fs'
import * as path from 'node:path'
import { promisify } from 'node:util'

import test from 'ava'

import { Detector, Lang, LangCode, LangCodeISO6391, detect, detectLang } from '..'

const readFileAsync = promisify(fs.readFile)

test('multiple examples', async (t) => {
  const examples = JSON.parse(
    await readFileAsync(path.resolve(path.join('__test__', 'examples.json')), 'utf-8'),
  ) as Record<string, string>

  Object.entries(examples).forEach(([code, text]) => {
    const detectedLang = detectLang(text)
    const lang = Lang.withCode(code as LangCode)

    t.truthy(detectedLang)
    t.truthy(lang)

    t.is(detectedLang?.code, code as LangCode)
    t.is(lang.code, code as LangCode)
  })
})

test('russian test', (t) => {
  const text = `
    Мой дядя самых честных правил,
    Когда не в шутку занемог,
    Он уважать себя заставил
    И лучше выдумать не мог.
  `

  const info = detect(text)

  t.truthy(info)

  t.is(info?.script.name, 'Cyrillic')
  t.is(info?.lang.code, LangCode.Rus)
  t.is(info?.lang.engName, 'Russian')
  t.is(info?.lang.name, 'Русский')

  t.is(info?.confidence, 1)
  t.true(info?.isReliable)
})

test('japanese with mandarin chars', (t) => {
  const text =
    'この間、川越城や松井田城などの諸城を拡張・改修 河越城の三の丸と八幡郭など拡張、松井田城の大道寺郭構築など'

  const info = detect(text)

  t.truthy(info)

  t.is(info?.script.name, 'Mandarin')
  t.is(info?.lang.code, LangCode.Jpn)
  t.true(info?.isReliable)
})

test('allow and deny list', (t) => {
  const zhDetector = Detector.withAllowlist([LangCode.Cmn])
  const nonZhDetector = Detector.withDenylist([LangCodeISO6391.Zh])

  t.falsy(zhDetector.detectLang('What I saying is English'))
  t.is(nonZhDetector.detectLang('这里是中文')?.code, LangCode.Jpn)
})
