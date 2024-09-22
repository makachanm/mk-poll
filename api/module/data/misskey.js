export const RenoteFromMisskey = async (url) => {
    const id = new URL(url).pathname.split('/').pop()
    const hostname = new URL(url).hostname

    const vreqd = {
        "noteId": id
    }

    const dnoteinfo = await fetch(`https://${hostname}/api/notes/show`, { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(vreqd)
    })

    const noteinfo = await dnoteinfo.json()
    let req_n = 1
    let must_parse_last = false

    console.log(noteinfo["renoteCount"])

    if(noteinfo["renoteCount"] <= 0) { return [] }

    if(noteinfo["renoteCount"] > 100){
        req_n = Math.floor(noteinfo["renoteCount"]/100)

        if (noteinfo["renoteCount"]%(100 * req_n) > 0){
            must_parse_last = true
        }
    }

    console.log(req_n, must_parse_last)

    let lastID = "";
    let parti_user = []

    for(let i = 1; i <= req_n; i++){
        const rnreqd = (lastID == "") ? {
            "noteId": id,
            "limit": 100
        } : {
            "noteId": id,
            "limit": 100,
            "untilId": lastID
        }

        const rnoteinfo = await fetch(`https://${hostname}/api/notes/renotes`, { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rnreqd)
        })

        const rn_data = await rnoteinfo.json()
        

        rn_data.forEach(el => {
            const uname = (el["user"]["host"] !== null) ? `@${el["user"]["username"]}@${el["user"]["host"]}` : `@${el["user"]["username"]}@${hostname}`
            parti_user.push(uname)
        })

        const last_d = rn_data.pop()
        lastID = last_d["id"]
    }

    if (must_parse_last){
        const rnreqd = {
            "noteId": id,
            "limit": ((noteinfo["renoteCount"]) - req_n*100),
            "sinceId": lastID
        }

        const rnoteinfo = await fetch(`https://${hostname}/api/notes/renotes`, { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rnreqd)
        })

        const rn_data = await rnoteinfo.json()

        rn_data.forEach(el => {
              const uname = (el["user"]["host"] !== null) ? `@${el["user"]["username"]}@${el["user"]["host"]}` : `@${el["user"]["username"]}@${hostname}`
            parti_user.push(uname)    
        })
    }

    return parti_user
}

export const ReactionFromMisskey = async (url) => {
    const id = new URL(url).pathname.split('/').pop()
    const hostname = new URL(url).hostname

    const vreqd = {
        "noteId": id
    }

    const dnoteinfo = await fetch(`https://${hostname}/api/notes/show`, { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(vreqd)
    })

    const noteinfo = await dnoteinfo.json()
    let req_n = 1
    let must_parse_last = false

    console.log(noteinfo["reactions"].length)

    let react_len = 0
    Object.keys(noteinfo["reactions"]).forEach(v => react_len += v)

    if(react_len <= 0) { return [] }

    if(react_len > 100){
        req_n = Math.floor(noteinfo["renoteCount"]/100)

        if (noteinfo["renoteCount"]%(100 * req_n) > 0){
            must_parse_last = true
        }
    }

    console.log(req_n, must_parse_last)

    let lastID = "";
    let parti_user = []

    for(let i = 1; i <= req_n; i++){
        const rnreqd = (lastID == "") ? {
            "noteId": id,
            "limit": 100
        } : {
            "noteId": id,
            "limit": 100,
            "untilId": lastID
        }

        const rnoteinfo = await fetch(`https://${hostname}/api/notes/reactions`, { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rnreqd)
        })

        const rn_data = await rnoteinfo.json()
        

        rn_data.forEach(el => {
            const uname = (el["user"]["host"] !== null) ? `@${el["user"]["username"]}@${el["user"]["host"]}` : `@${el["user"]["username"]}@${hostname}`
            parti_user.push(uname)
        })

        const last_d = rn_data.pop()
        lastID = last_d["id"]
    }

    if (must_parse_last){
        const rnreqd = {
            "noteId": id,
            "limit": ((noteinfo["renoteCount"]) - req_n*100),
            "sinceId": lastID
        }

        const rnoteinfo = await fetch(`https://${hostname}/api/notes/renotes`, { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rnreqd)
        })

        const rn_data = await rnoteinfo.json()

        rn_data.forEach(el => {
              const uname = (el["user"]["host"] !== null) ? `@${el["user"]["username"]}@${el["user"]["host"]}` : `@${el["user"]["username"]}@${hostname}`
            parti_user.push(uname)    
        })
    }

    return parti_user
}