self.onmessage =(e)=> {
    window.localStorage.setItem(e.key, JSON.stringify(e.val))
}