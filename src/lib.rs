#![deny(clippy::all)]

use napi_derive::napi;
use whatlang::{Detector, Lang};

mod info;
mod lang;
mod script;

pub use crate::{info::JsInfo, lang::JsLang, script::JsScript};

#[napi(js_name = "Detector")]
pub struct JsDetector {
  detector: Detector,
}

impl JsDetector {
  fn detect_impl(&self, text: &str) -> Option<JsInfo> {
    self.detector.detect(text).map(|info| info.into())
  }

  fn detect_script_impl(&self, text: &str) -> Option<JsScript> {
    self.detector.detect_script(text).map(|info| info.into())
  }

  fn detect_lang_impl(&self, text: &str) -> Option<JsLang> {
    self.detector.detect_lang(text).map(|info| info.into())
  }

  fn serialize_codes_to_lang(codes: Vec<String>) -> Vec<Lang> {
    codes
      .into_iter()
      .filter_map(|code| {
        if code.len() == 2 {
          JsLang::from_iso639_1(&code).map(|l| l.into())
        } else if code.len() == 3 {
          Lang::from_code(code)
        } else {
          None
        }
      })
      .collect()
  }
}

#[napi]
impl JsDetector {
  #[napi(constructor)]
  pub fn new() -> Self {
    JsDetector::default()
  }

  #[napi(factory)]
  pub fn with_allowlist(
    #[napi(ts_arg_type = "(LangCode | LangCodeISO6391)[]")] list: Vec<String>,
  ) -> Self {
    JsDetector {
      detector: Detector::with_allowlist(JsDetector::serialize_codes_to_lang(list)),
    }
  }

  #[napi(factory)]
  pub fn with_denylist(
    #[napi(ts_arg_type = "(LangCode | LangCodeISO6391)[]")] list: Vec<String>,
  ) -> Self {
    JsDetector {
      detector: Detector::with_denylist(JsDetector::serialize_codes_to_lang(list)),
    }
  }

  #[napi]
  pub fn detect(&self, text: String) -> Option<JsInfo> {
    self.detect_impl(&text)
  }

  #[napi]
  pub fn detect_lang(&self, text: String) -> Option<JsLang> {
    self.detect_lang_impl(&text)
  }

  #[napi]
  pub fn detect_script(&self, text: String) -> Option<JsScript> {
    self.detect_script_impl(&text)
  }
}

impl Default for JsDetector {
  fn default() -> Self {
    JsDetector {
      detector: Detector::new(),
    }
  }
}

#[napi]
pub fn detect(text: String) -> Option<JsInfo> {
  JsDetector::default().detect_impl(&text)
}

#[napi]
pub fn detect_lang(text: String) -> Option<JsLang> {
  JsDetector::default().detect_lang_impl(&text)
}

#[napi]
pub fn detect_script(text: String) -> Option<JsScript> {
  JsDetector::default().detect_script_impl(&text)
}
