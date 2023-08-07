import requset from '../utils/request';

export class QueryObject {
    constructor(start = 0, limit = 10) {
        this.conditions = [];
        this.limit = limit;
        this.start = start;
        this.count = false;
        this.replyWithCount = true;
        this.noError = false;
        this.sortBy = 'createDate';
        this.sortDirection = 'desc';
    }
    putCondition(cond) {
        this.conditions.push(cond);
    }
    putFiled(fields) {
        this.fields = fields;
    }
    putGroup(groupBy) {
        this.groupBy = groupBy;
    }
    putSort(sortBy, sortDirection) {
        this.sortBy = sortBy;
        this.sortDirection = sortDirection;
    }
}

function removeEmptyValueOfObject(obj) {
    const newObj = {};
    if (!obj) {
        return obj
    } else {
        Object.keys(obj).forEach(key => {
            if (obj[key] !== null && obj[key] !== '') {
                newObj[key] = obj[key];
            }
        });
    }
    return newObj;
}
export function requestWrapper(path, apiPath, data, isQuery = false) {
    data = removeEmptyValueOfObject(data);
    if (isQuery) {
        if (!(data instanceof QueryObject)) {
            data = Object.assign({}, new QueryObject(), data);
        }
    }
    data = deepCopy(data);
    return requset.post(path, {
        [apiPath]: data
    });
}

export function deepCopy(obj) {
    if(obj === null || typeof obj !== 'object') {
        return obj;
    }else if(obj.constructor === RegExp) {
        return new RegExp(obj);
    }else if(obj.constructor === Date) {
        return new Date(obj.getTime());
    }
    const copy = Array.isArray(obj) ? [] : {};
    Object.keys(obj).forEach(key => {
        if (obj[key] !== '') {
            copy[key] = deepCopy(obj[key]);
        }
    });
    return copy;
}


export function queryFlowAnalysisData(data) {
    return requset.post('/hybridwan/v1/monitor/flowAnalysis', data);
}