class Collection  {
    state = {  }

    constructor(){
        this.count = 0;
        this.collection = {};
    }

    add = (key, data) => {
        if(this.collection[key] != undefined) return undefined;

        this.collection[key] = data;
        return ++this.count;
    }

    remove = key => {
        if(this.collection[key] == undefined) return undefined;

        delete this.collection[key];
        return --this.count;
    }

    update = (key, data) => {
        if(this.collection[key] == undefined) return undefined;

        this.collection[key] = data;
        return `${key} updated`;
    }

    getData = key => {
        if(this.collection[key] == undefined) return undefined;

        return this.collection[key];
    }

}
 
export default Collection;