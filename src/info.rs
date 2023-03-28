use napi_derive::napi;
use whatlang::Info;

use crate::{JsLang, JsScript};

#[napi(js_name = "Info")]
pub struct JsInfo {
  info: Info,
}

#[napi]
impl JsInfo {
  #[napi(constructor)]
  pub fn new(script: &JsScript, lang: &JsLang, confidence: f64) -> Self {
    Self {
      info: Info::new(script.clone().into(), lang.clone().into(), confidence),
    }
  }

  #[napi(getter)]
  pub fn lang(&self) -> JsLang {
    self.info.lang().into()
  }

  #[napi(getter)]
  pub fn script(&self) -> JsScript {
    self.info.script().into()
  }

  #[napi(getter)]
  pub fn confidence(&self) -> f64 {
    self.info.confidence()
  }

  #[napi(getter)]
  pub fn is_reliable(&self) -> bool {
    self.info.is_reliable()
  }
}

impl From<Info> for JsInfo {
  fn from(value: Info) -> Self {
    JsInfo { info: value }
  }
}
