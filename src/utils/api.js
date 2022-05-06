const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

class Api {
    constructor({url, token}) {
        this._url = url;
        this._token = token;
    }
    
    /* getPosts() {
        return fetch(`${this._url}/posts`, {
            headers: {
                authorization: `Bearer ${this._token}`
            }
        }).then(onResponse)
        .catch(err => alert(err))
    } */

    getPosts(pageNumber) {
        return fetch(`${this._url}/posts/paginate?page=${pageNumber}&limit=12`, {
            headers: {
                authorization: `Bearer ${this._token}`,
            }
        }).then(onResponse)
    }

    getUser() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: `Bearer ${this._token}`
            }
        }).then(onResponse)
    }

    addLike(postId) {
        return fetch(`${this._url}/posts/likes/${postId}`, {
            method:'PUT',
            headers: {
                authorization: `Bearer ${this._token}`
            }
        }).then(onResponse)
    }

    deleteLike(postId) {
        return fetch(`${this._url}/posts/likes/${postId}`, {
            method:'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`
            }
        }).then(onResponse)
    }

    deletePost(postId) {
        return fetch(`${this._url}/posts/${postId}`, {
            method:'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`
            }
        }).then(onResponse)
    }
    
    addPost(post) {
        return fetch(this._url + '/posts', {
            method: 'POST',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        }).then(onResponse)
    }

    getPost(postId) {
        return fetch(`${this._url}/posts/${postId}`, {
            headers: {
                authorization: `Bearer ${this._token}`
            }
        }).then(onResponse)
    }

    getComments(postId) {
        return fetch(`${this._url}/posts/comments/${postId}`, {
            headers: {
                authorization: `Bearer ${this._token}`
            }
        }).then(onResponse)
    }
    
}

export default Api;


