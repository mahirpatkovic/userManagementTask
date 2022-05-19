import axios from 'axios';

class Service {
    static getUsers(reqData) {
        const { page, perPage, sortVal, sortOrd, status } = reqData;
        return axios.get(
            `http://localhost:8800/api/users?page=${page}&perPage=${perPage}&sortValue=${sortVal}&sortOrder=${sortOrd}&status=${status}`
        );
    }

    static createUser(reqData) {
        return axios.post('http://localhost:8800/api/users', reqData);
    }

    static getUser(reqData) {
        return axios.get('http://localhost:8800/api/users/' + reqData.id);
    }

    static updateUser(reqData) {
        return axios.patch(
            'http://localhost:8800/api/users/updateUser',
            reqData
        );
    }

    static removeUser(reqData) {
        return axios.delete('http://localhost:8800/api/users/' + reqData);
    }

    static getUsersPermission(reqData) {
        return axios.get(
            'http://localhost:8800/api/permissions/' + reqData.userId
        );
    }

    static createPermission(reqData) {
        return axios.post('http://localhost:8800/api/permissions', reqData);
    }

    static getAllPermissions(reqData) {
        const { page, perPage } = reqData;
        return axios.get(
            `http://localhost:8800/api/permissions?page=${page}&perPage=${perPage}`
        );
    }
    static updatePermission(reqData) {
        return axios.patch(
            'http://localhost:8800/api/permissions/updatePermission',
            reqData
        );
    }

    static removePermission(reqData) {
        return axios.delete('http://localhost:8800/api/permissions/' + reqData);
    }
}

export default Service;
