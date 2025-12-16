// src/config/test.config.ts

// export const config = {
//   url: 'https://advaita-one.wyzmindz.com/login',
//   browser: 'chromium',           // 'chromium' | 'firefox' | 'webkit'
//   headless: false,
//   slowMo: 100,                   // milliseconds 
//   viewport: null, // Add this line
//   credentials: {
//     username: 'admin@mail.com',
//     password: 'admin'

   
//   }
// }; 


// // src/config/test.config.ts
// export const config = {
//   url: 'https://your-app-url.com',
//   headless: false,
//   viewport: { width: 1280, height: 720 },
//   credentials: {
//     username: 'admin@mainModule.com',
//     password: 'yourPasswordHere'
//   }
// };

export const config = {
  url: 'https://advaita-one.wyzmindz.com/login',

  browser: 'chromium',               // 'chromium' | 'firefox' | 'webkit'
  headless: false,                   // UI will open
  slowMo: 100,                       // slow action for visual debugging
  viewport: { width: 1400, height: 900 },

  credentials: {
    username: 'admin@mail.com',
    password: 'admin'
  }
};


