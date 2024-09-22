export const BoostFromMastodon = async (url) => {
    const id = new URL(url).pathname.split('/').pop()
    const hostname = new URL(url).hostname

    const dnoteinfo = await fetch(`https://${hostname}/api/v1/statuses/${id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })

    const noteinfo = await dnoteinfo.json()
    let req_n = 1
    let must_parse_last = false

    if(noteinfo["reblogs_count"] <= 0) { return [] }

    if(noteinfo["reblogs_count"] > 80){
        req_n = Math.floor(noteinfo["reblogs_count"]/80)

        if (noteinfo["reblogs_count"]%(80 * req_n) > 0){
            must_parse_last = true
        }
    }

    console.log(must_parse_last, req_n)

    let lastID = "";
    let parti_user = []

    for(let i = 1; i <= req_n; i++){
        const rnoteendurl = (lastID == "") ? 
            `https://${hostname}/api/v1/statuses/${id}/reblogged_by?limit=80` : 
            `https://${hostname}/api/v1/statuses/${id}/reblogged_by?limit=80&since_id=${lastID}`

        const rnoteinfo = await fetch(rnoteendurl, { 
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })

        const rn_data = await rnoteinfo.json()
        

        rn_data.forEach(el => {
            const uname = (el["acct"].indexOf("@") !== -1) ? `@${el["acct"]}` : `@${el["acct"]}@${hostname}`
            parti_user.push(uname)
        })

        const last_d = rn_data.pop()
        lastID = last_d["id"]
    }

    if (must_parse_last){
         const limit = ((noteinfo["reblogs_count"]) - req_n*80)
        const rnoteendurl = `https://${hostname}/api/v1/statuses/${id}/reblogged_by?limit=${limit}&since_id=${lastID}`

        const rnoteinfo = await fetch(rnoteendurl, { 
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })

        const rn_data = await rnoteinfo.json()
        

        rn_data.forEach(el => {
            const uname = (el["acct"].indexOf("@") !== -1) ? `@${el["acct"]}` : `@${el["acct"]}@${hostname}`
            parti_user.push(uname)            
        })
    }

    console.log(parti_user)

    return parti_user
}

export const FavouritesFromMastodon = async (url) => {
    const id = new URL(url).pathname.split('/').pop()
    const hostname = new URL(url).hostname

    const dnoteinfo = await fetch(`https://${hostname}/api/v1/statuses/${id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })

    const noteinfo = await dnoteinfo.json()
    let req_n = 1
    let must_parse_last = false

    if(noteinfo["favourites_count"] <= 0) { return [] }

    if(noteinfo["favourites_count"] > 80){
        req_n = Math.floor(noteinfo["favourites_count"]/80)

        if (noteinfo["favourites_count"]%(80 * req_n) > 0){
            must_parse_last = true
        }
    }

    console.log(must_parse_last, req_n)

    let lastID = "";
    let parti_user = []

    for(let i = 1; i <= req_n; i++){
        const rnoteendurl = (lastID == "") ? 
            `https://${hostname}/api/v1/statuses/${id}/favourited_by?limit=80` : 
            `https://${hostname}/api/v1/statuses/${id}/favourited_by?limit=80&since_id=${lastID}`

        const rnoteinfo = await fetch(rnoteendurl, { 
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })

        const rn_data = await rnoteinfo.json()
        

        rn_data.forEach(el => {
            const uname = (el["acct"].indexOf("@") !== -1) ? `@${el["acct"]}` : `@${el["acct"]}@${hostname}`
            parti_user.push(uname)
        })

        const last_d = rn_data.pop()
        lastID = last_d["id"]
    }

    if (must_parse_last){
         const limit = ((noteinfo["reblogs_count"]) - req_n*80)
        const rnoteendurl = `https://${hostname}/api/v1/statuses/${id}/favourites_count?limit=${limit}&since_id=${lastID}`

        const rnoteinfo = await fetch(rnoteendurl, { 
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })

        const rn_data = await rnoteinfo.json()
        

        rn_data.forEach(el => {
            const uname = (el["acct"].indexOf("@") !== -1) ? `@${el["acct"]}` : `@${el["acct"]}@${hostname}`
            parti_user.push(uname)            
        })
    }

    console.log(parti_user)

    return parti_user
}