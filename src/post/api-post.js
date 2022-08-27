const create = async (params, credentials, post) => {
  try {
    let response = await fetch('http://0.0.0.0:8000/api/post/posts/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: post
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const listByUser = async (params, credentials) => {
  try {
    let response = await fetch('http://0.0.0.0:8000/api/post/by/'+ params.username, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const listNewsFeed = async (params, credentials, signal) => {
  try {
    let response = await fetch('http://0.0.0.0:8000/api/post/posts/', {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })    
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const remove = async (params, credentials) => {
  try {
    let response = await fetch('http://0.0.0.0:8000/api/post/post-detail/' + params.postId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}


const like = async (params, credentials, postId) => {
  try {
    let response = await fetch('http://0.0.0.0:8000/api/post/like-post/?post_id=' + postId, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({username:params.username, postId: postId})
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}


const unlike = async (params, credentials, postId) => {
  try {
    let response = await fetch('http://0.0.0.0:8000/api/post/like-post/?post_id=' + postId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({user:params.username, postId: postId})
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}


const comment = async (params, credentials, postId, comment) => {
  try {
    let response = await fetch('http://0.0.0.0:8000/api/post/comment-post/?post_id=' + postId, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({username:params.username, postId: postId, text: comment.text})
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}


const uncomment = async (params, credentials, postId, comment) => {
  try {
    let response = await fetch('http://0.0.0.0:8000/api/post/comment-post/?post_id=' + postId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({username:params.username, postId: postId, text: comment.text})
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}


export {
  listNewsFeed,
  listByUser,
  create,
  remove,
  like,
  unlike,
  comment,
  uncomment
}
