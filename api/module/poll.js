import { ResolveApp, ShuffleArray } from "./utils"
import { fetchFromMisskey, fetchFromMastodon } from "./data/data"
import { PollType, SoftwareType } from "./const"

const doPoll = async (req) => {
    if (req.headers.get('Content-Type') !== "application/json"){
		return new Response('invalid content type: must use application/json.', { status: 405 })
	}

    const req_m = {
        "url": "",
        "max_number": 1,
        "poll_type": PollType.ONLY_RENOTE
    }

	let jq_json = await req.json()
	let data = Object.assign(req_m, jq_json)

    if (data.url == ""){
        return new Response('data field: url is not assigned', { status: 400 })
    }

    const apptype = await ResolveApp(data.url)
    const candiates = await pickData(data.url, apptype, data.poll_type)

    candiates.filter(val => (val == null))

    if (candiates == null){
        return new Response('poll type error: not assigned or not exsiting type', { status: 400 })
    }

    const shuffled = ShuffleArray(candiates)

    let results = []

    for(let i = 0; i < data.max_number; i++){
        results.push(shuffled.pop())
    }

    console.log(results)

    const candidate_total = candiates.length

    const RespData = {
        "polled": results,
        "candidate_nums": candidate_total
    }

    return new Response(JSON.stringify(RespData), { headers: { 'Content-Type': "application/json" } })
}

const pickData = async (url, type, polltype) => {
    switch (type) {
        case SoftwareType.MISSKEY:
            return await fetchFromMisskey(url, polltype)
        
        case SoftwareType.MASTODON:
            return await fetchFromMastodon(url, polltype)

        default:
            return []
    }
} 

export default doPoll