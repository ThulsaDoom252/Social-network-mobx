// windowValues.ts
declare global {
    interface Window {
        myApp: {
            [key: string]: any;
        };
    }
}

if (!window.myApp) {
    window.myApp = {};
}

export default window.myApp;