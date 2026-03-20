import { patternType } from "./pattern";
import { postType } from "./post";
import { globalSettingsType } from "./globalSettings";
import { homePageType } from "./homePage";
import { aboutPageType } from "./aboutPage";
import { faqPageType } from "./faqPage";
import { patternsPageType } from "./patternsPage";
import { blogPageType } from "./blogPage";

export const schemaTypes = [
  // Singletons (én per type)
  globalSettingsType,
  homePageType,
  aboutPageType,
  faqPageType,
  patternsPageType,
  blogPageType,
  // Collections
  patternType,
  postType,
];
