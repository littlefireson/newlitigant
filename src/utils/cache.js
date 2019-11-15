const cacheName='litigant';
const cache={
    engine:sessionStorage,
    setItem:function(key,value){
        this.engine.setItem(`${cacheName}_${key}`,value);
    },
    getItem:function(key){
        return this.engine.getItem(`${cacheName}_${key}`);
    },
    removeItem:function(key){
        this.engine.removeItem(`${cacheName}_${key}`);
    },
    clear:function(){
        this.engine.clear();
    }
};
export default cache;