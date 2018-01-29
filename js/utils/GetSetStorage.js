import {
    AsyncStorage,
} from 'react-native';
class GetSetStorage {
    /**
     * 异步保存
     */
    setStorageAsync(key, value) {
        return new Promise((resolve, reject) => {
            AsyncStorage.setItem(key, value, (error) => {
                if (error) {
                    console.log(`设置${key}失败${error}`);
                    reject(`设置${key}失败${error}`);
                } else {
                    console.log(`设置${key}成功`);
                    resolve(true);
                }
            });
        });
    }
    /**
     * 异步获取
     */
    getStorageAsync(key) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(key, (error, result) => {
                if (error) {
                    console.log(`读取${key}失败` + error);
                    reject(`读取${key}失败${error}`);
                } else {
                    console.log(`读取${key}成功`);
                    resolve(result);
                }
            });
        });

    }
    /**
     * 异步移除
     */
    removeStorageAsync(key) {
        return new Promise((resolve, reject) => {
            AsyncStorage.removeItem(key, (error, result) => {
                if (error) {
                    console.log(`移除${key}失败` + error);
                    reject(`移除${key}失败${error}`);
                } else {
                    console.log(`移除${key}成功`);
                    resolve(result);
                }
            });
        });

    }
}
export default new GetSetStorage();