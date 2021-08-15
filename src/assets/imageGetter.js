export const ImgLib = {
    svg: {
        lock: './images/svg/lock.svg',
        unlock: './images/svg/unlock.svg',
        editBox: './images/svg/edit-box.svg',
        edit: './images/svg/edit.svg'
    }
};

export const getSvg = (key) => {
    const toReturn = require(`${ImgLib.svg[key]}`);
    return toReturn;
};
