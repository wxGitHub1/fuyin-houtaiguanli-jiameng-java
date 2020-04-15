//session 操作

// 设置session
const setItem = (key, value) => sessionStorage.setItem(key, JSON.stringify(value));

//获取session
const getItem = key => JSON.parse(sessionStorage.getItem(key));

//移除session
const removeItem = key => sessionStorage.removeItem(key);

//移除所有session
const clear = () => sessionStorage.clear();

//登陆时设置用户名
const setUser = value => setItem('user', value);
const getUser = () => (!getItem('user' ? {} : getItem('user')));
const removeUser = () => removeItem('user');

//登陆时设置验证码
const setValidate = value => setItem('validate', value);
const getValidate = () => (!getItem('validate' ? {} : getItem('validate')));
const removeValidate = () => removeItem('validate');

const isLogin = () => !!getUser().id;


export default {
    setItem,
    getItem,
    removeItem,
    clear,
    setUser,
    getUser,
    removeUser,
    isLogin,
    setValidate,
    getValidate,
    removeValidate,
}