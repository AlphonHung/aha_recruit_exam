/** method: 取得本地儲存值 */
export const getStorageValue = <T>(key: string, defaultValue: T, checkEmpty?: boolean): T => {
    const dataStr = localStorage.getItem(key);
    if (!dataStr) return defaultValue;
    try {
        const cache = JSON.parse(dataStr) as T;
        if (checkEmpty) {
            return { ...defaultValue, ...cache };
        }
        return cache;
    } catch (error) {
        console.log(error);
    }
    return defaultValue;
}