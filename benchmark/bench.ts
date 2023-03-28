import b from 'benny'
import Detector from 'languagedetect'
import { detectLang } from 'whatlang-node'

import { detectLang as detectLang2 } from '..'

const input = 'The quick brown fox jumps over the lazy dog'

async function run() {
  await b.suite(
    'Detect language',

    b.add('languagedetect', () => {
      const detector = new Detector()

      detector.detect(input, 1)
    }),

    b.add('whatlang-node', () => {
      detectLang(input)
    }),

    b.add('@notevenaneko/whatlang-node', () => {
      detectLang2(input)
    }),

    b.cycle(),
    b.complete(),
  )
}

run().catch((e) => {
  console.error(e)
})
