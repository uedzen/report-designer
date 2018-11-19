import Magix from 'magix';
let Service = Magix.Service.extend((bag, callback) => {
    let method = bag.get('method') || 'GET';
    fetch(bag.get('url'), {
        method,
        credentials: 'include'
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error('Network response error');
    }).then(res => {
        bag.set('data', res.data);
        callback();
    }).catch(ex => {
        callback({ msg: ex.message });
    });
});

Service.add([{
    name: '@{get.background.images}',
    url: Magix.config('getBackgroundImageUrl')
}]);

export default {
    ctor() {
        let me = this;
        me.on('rendercall', () => { //render方法被调用时，清除locker信息
            delete me['@{locker}'];
        });
    },
    request(key) {
        key = key || Magix.guid('r');
        let r = new Service();
        this.capture(key, r, true);
        return r;
    },
    fetch(models, callback) {
        let key = JSON.stringify(models);
        let r = this.request(key);
        r.all(models, callback);
    },
    /**
     * 保存数据到服务器
     * 默认保存时同样的数据不能多次提交
     * @param  {Array} models meta信息数组
     * @param  {Function} callback
     */
    save(models, callback) {
        let me = this;
        let key = JSON.stringify(models);
        me.lock(key, () => {
            me.request(key + '_request').save(models, callback);
        });
    },
    /**
     * 锁定方法调用，在解锁前不能调用第二次，常用于反复提交
     * @param  {String} key 锁定的key
     * @param  {Function} fn 回调方法
     */
    lock(key, fn) {
        let me = this;
        if (!me['@{locker}']) me['@{locker}'] = {};
        let locker = me['@{locker}'];
        if (!locker[key]) {
            locker[key] = fn;
            fn();
        }
    },
    /**
     * 解锁
     * @param  {String} key 锁定的key
     */
    unlock(key) {
        let locker = this['@{locker}'];
        if (locker) {
            delete locker[key];
        }
    }
}