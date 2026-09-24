export const translations = {
  en: {
    home: {
      "home-title": "Hi!\nI'm Eddy Chen.",
      "home-title03": "I'm a frontend engineer.",
    },
    navigation: {
      "logo-alt": "EC logo",
      "about-me": "About me",
      "post-and-projects": "Posts & Projects",
      "open-menu": "Open menu",
      "close-menu": "Close menu",
    },
    updates: {
      "new-post": "New post",
      "new-project": "New project",
    },
    aboutMe: {
      "about-me-title": "Introduction",
      experiences: "experiences",
    },
    footer: {
      "footer-location": "location",
      "footer-location-spot": "tokyo, japan",
      "footer-local-time": "local time",
    },
  },
  zh: {
    home: {
      "home-title": "嗨！\n我是陳品叡",
      "home-title03": "我是前端工程師",
    },
    navigation: {
      "logo-alt": "EC logo",
      "about-me": "關於我",
      "post-and-projects": "文章和專案",
      "open-menu": "打開選單",
      "close-menu": "關閉選單",
    },
    updates: {
      "new-post": "新文章",
      "new-project": "新專案",
    },
    aboutMe: {
      "about-me-title": "自我介紹",
      experiences: "經歷",
    },
    footer: {
      "footer-location": "位置",
      "footer-location-spot": "日本・東京都",
      "footer-local-time": "當地時間",
    },
  },
  jp: {
    home: {
      "home-title": "チェンピンルイ",
      "home-title03": "フロントエンドエンジニア",
    },
    navigation: {
      "logo-alt": "EC logo",
      "about-me": "私について",
      "post-and-projects": "文章とプロジェクト",
      "open-menu": "メニューを開く",
      "close-menu": "メニューを閉じる",
    },
    updates: {
      "new-post": "新しい投稿",
      "new-project": "新しいプロジェクト",
    },
    aboutMe: {
      "about-me-title": "自己紹介",
      experiences: "経歴",
    },
    footer: {
      "footer-location": "位置",
      "footer-location-spot": "日本，東京都",
      "footer-local-time": "当地時間",
    },
  },
};

export type TranslationKey = keyof typeof translations;
export type Translations = typeof translations.en;

export const locales = ["en", "zh", "jp"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
