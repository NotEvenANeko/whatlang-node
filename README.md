# `whatlang-node`

![https://github.com/Cattttttttt/whatlang-node/actions](https://github.com/Cattttttttt/whatlang-node/workflows/CI/badge.svg)

> NodeJS binding of [whatlang-rs](https://github.com/greyblake/whatlang-rs)

## Usage

### Install

```shell
npm install @notevenaneko/whatlang-node
```

or

```shell
yarn add @notevenaneko/whatlang-node
```

or

```shell
pnpm add @notevenaneko/whatlang-node
```

### Detect language

```typescript
import { detect, LangCode, LangCodeISO6391 } from '@notevenaneko/whatlang-node'

const info = detect(englishInput)

info.lang.code === LangCode.Eng
info.lang.codeISO6391 === LangCodeISO6391.En
info.lang.name === 'English'
info.lang.engName === 'English'

info.script.name === 'Latin'

compareFloat(info.confidence, 1) === true

info.isReliable === true
```

### Allowlist and denylist

```typescript
import { Detector, LangCode } from '@notevenaneko/whatlang-node'

const normalDetector = new Detector()

const chineseDetector = Detector.withAllowlist([LangCode.Cmn /* or LangCodeISO6391.Zh in ISO639-1 */])

normalDetector.detectLang(englishInput).code === LangCode.Eng

chineseDetector.detectLang(englishInput) === null

const noZhDetector = Detector.withDenylist([LangCode.Cmn /* or LangCodeISO6391.Zh in ISO639-1 */])

normalDetector.detectLang(chineseInput).code === LangCode.Cmn

noZhDetector.detectLang(chineseInput).code === LangCode.Jpn
```

## Support matrix

### Operating Systems

|                  | node14 | node16 | node18 |
| ---------------- | ------ | ------ | ------ |
| Windows x64      | ✓      | ✓      | ✓      |
| Windows x32      | ✓      | ✓      | ✓      |
| Windows arm64    | ✓      | ✓      | ✓      |
| macOS x64        | ✓      | ✓      | ✓      |
| macOS arm64      | ✓      | ✓      | ✓      |
| Linux x64 gnu    | ✓      | ✓      | ✓      |
| Linux x64 musl   | ✓      | ✓      | ✓      |
| Linux arm gnu    | ✓      | ✓      | ✓      |
| Linux arm64 gnu  | ✓      | ✓      | ✓      |
| Linux arm64 musl | ✓      | ✓      | ✓      |
| Android arm64    | ✓      | ✓      | ✓      |
| Android armv7    | ✓      | ✓      | ✓      |
| FreeBSD x64      | ✓      | ✓      | ✓      |

## Bench

```plain
Name: Apple M1
Vendor String: Apple
Vendor ID: VendorUnknown
PhysicalCores: 8
Threads Per Core: 1
Logical Cores: 8
CPU Family 458787763 Model: 0 Stepping: 0
Features: AESARM,ASIMD,ASIMDDP,ASIMDHP,ASIMDRDM,ATOMICS,CRC32,DCPOP,FCMA,FP,FPHP,GPA,JSCVT,LRCPC,PMULL,SHA1,SHA2,SHA3,SHA512
Microarchitecture level: 0
Cacheline bytes: 128
L1 Instruction Cache: 131072 bytes
L1 Data Cache: 65536 bytes
L2 Cache: 4194304 bytes
L3 Cache: -1 bytes

Running "Detect language" suite...
Progress: 100%

  languagedetect:
    10 799 ops/s, ±3.38%   | slowest, 38.05% slower

  whatlang-node:
    17 432 ops/s, ±0.97%   | fastest

  @notevenaneko/whatlang-node:
    17 294 ops/s, ±0.58%   | 0.79% slower

Finished 3 cases!
  Fastest: whatlang-node
  Slowest: languagedetect
```

## TODO

- [ ] Complete Script enum and constructor
- [ ] documentation
