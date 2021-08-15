import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import Keys from "../renderer/constants/appKeys";

let win;

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!Keys.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

    return Promise.all(
        extensions.map(name => installer.default(installer[name], forceDownload))
    ).catch(console.log); // eslint-disable-line no-console
};

const createWindow = async () => {
    if (process.env.NODE_ENV !== 'production') {
        await installExtensions();
    }

    win = new BrowserWindow({
        fullscreen: true,
        show: true,
        webPreferences: {
            webSecurity: process.env.NODE_ENV !== 'development'
        }
    });
    win.show();
    win.maximize();
    if (process.env.NODE_ENV !== 'production') {
        process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'; // eslint-disable-line require-atomic-updates
        win.loadURL(`http://localhost:2003`);
        win.setFullScreen(true);
    } else {
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file:',
                slashes: true
            })
        );
    }
    if (process.env.NODE_ENV !== 'production') {
        // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
        win.webContents.once('dom-ready', () => {
            win.webContents.openDevTools();
        });
    }

    win.on('closed', () => {
        win = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
